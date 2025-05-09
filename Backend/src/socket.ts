import { Server } from 'socket.io';
import http from 'http';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shopkeeperSockets: { [key: string]: string } = {};
const ordersTimers: { [key: string]: NodeJS.Timeout } = {};
const paymentTimers: { [key: string]: NodeJS.Timeout } = {};
const confirmPaymentTimers: { [key: string]: NodeJS.Timeout } = {};

// send notifs and set orders status update on each event
// room id stored on each orders (room_id = userId + shopkeeperId + socket.id)

export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle shopkeeper registration
    socket.on('registerShopkeeper', (shopkeeperId) => {
      shopkeeperSockets[shopkeeperId] = socket.id;
      console.log(`Shopkeeper registered: ${shopkeeperId} with socket ID: ${socket.id}`);
    });

    // store the orders here and send  
    socket.on('placeOrder', async (orders) => {
      const roomId = `orders_${orders.userId}_${orders.shopkeeperId}_${socket.id}`; // Unique room ID
      socket.join(roomId);
      io.to(roomId).emit('orderPlaced', { orders, roomId });
      console.log(`order placed: ${JSON.stringify(orders)} in room: ${roomId}`);

      await prisma.orders.create({
        data: {
          userId: orders.userId,
          shopId: orders.shopkeeperId,
          items: orders.items,
          total: orders.total,
          status: 'Placed', // Initial status
          statusCode: 0,
          roomId: roomId,
        },
      });
     
      // Notify the shopkeeper to join the room
      const shopkeeperSocketId = shopkeeperSockets[orders.shopkeeperId];
      if (shopkeeperSocketId) {
        const orderss = await prisma.orders.findMany({
          where: { shopId: orders.shopkeeperId },
          orderBy: { createdAt: 'desc' },
        });
        io.to(shopkeeperSocketId).emit('updateOrderList', orderss);
      }

      // start timer
      const timerDuration = 60; // 60 seconds

      ordersTimers[roomId] = setTimeout(async () => {
        // Timer expired, reject the orders and add it to issues
        delete ordersTimers[roomId];
    
        // Update the orders status to "Rejected"
        const updatedorders = await prisma.orders.update({
          where: { roomId: roomId },
          data: { status: 'Rejected by shopkeeper', statusCode: 1 },
        });
    
        // Add the orders to issues
        const issue = await prisma.issue.create({
          data: {
            description: 'orders timed out',
            order: { connect: { id: updatedorders.id } },
          },
        });
        console.log(`orders rejected and added to issues: ${JSON.stringify(issue)}`);

        // Notify the user and shopkeeper
        io.to(roomId).emit('orderRejected', { roomId, reason: 'orders timed out' });
        io.to(roomId).emit('leaveRoom', { roomId });
      }, 1000*timerDuration);// Update every second
    });

    // Handle shopkeeper joining the room
    socket.on('joinRoom',async (data) => {
      const roomId = data.roomId;
      const shopkeeperSocketId = shopkeeperSockets[data.shopkeeperId];
      socket.join(roomId);
      const orders = await prisma.orders.findUnique({
        where: { roomId: roomId }
      })
      if (orders) {
        const startTime = new Date(orders.createdAt).getTime();
        const currentTime = new Date().getTime();
        const timerLeft = Math.floor((currentTime - startTime) / 1000);
        io.to(shopkeeperSocketId).emit('orderTimerUpdate', {timerLeft});
      }
      console.log(`Shopkeeper joined room: ${roomId}`);
    });

    // Handle orders acceptance
    socket.on('acceptOrder', async (data) => {

      const roomId = data.roomId;

      clearTimeout(ordersTimers[roomId]); // Clear the timer if the orders is accepted
      delete ordersTimers[roomId];

      await prisma.orders.update({
        where: { roomId: roomId },
        data: { status: 'Accepted', statusCode: 2 },
      });

      io.to(roomId).emit('orderAccepted', data);
      console.log(`orders accepted: ${JSON.stringify(data)} in room: ${roomId}`);

      // Start a payment timer for the user
      const paymentTimerDuration = 60; // 60 seconds
      
      paymentTimers[roomId] = setTimeout(async () => {
        // Timer expired, reject the orders and add it to issues
        delete paymentTimers[roomId];

        // Update the orders status to "Rejected"
        const updatedorders = await prisma.orders.update({
          where: { roomId: roomId },
          data: { status: 'Rejected by User', statusCode: 3 },
        });
        // Add the orders to issues
        const issue = await prisma.issue.create({
          data: {
            description: 'Payment timed out',
            order: { connect: { id: updatedorders.id } },
          },
        });
        console.log(`orders rejected and added to issues: ${JSON.stringify(issue)}`);

        // Notify the user and shopkeeper
        io.to(roomId).emit('orderRejected', { roomId, reason: 'Payment timed out' });
        io.to(roomId).emit('leaveRoom', { roomId });

      }, 1000*paymentTimerDuration); // Update every second
    });

    // Handle payment
    socket.on('makePayment', async (data) => {
      const roomId = data.roomId;

      await prisma.orders.update({
        where: { roomId: roomId },
        data: { status: 'Payment made, awaiting confirmation', statusCode: 4 },
      });
      clearTimeout(paymentTimers[roomId]); // Clear the timer if the payment is made
      delete paymentTimers[roomId];

      io.to(roomId).emit('paymentMade', data);

      console.log(`Payment made: ${JSON.stringify(data)} in room: ${roomId}`);

      // Start a confirmation timer for the shopkeeper
      const confirmPaymentTimerDuration = 60; // 60 seconds

      confirmPaymentTimers[roomId] = setTimeout(async () => {
        // Timer expired, reject the orders and add it to issues
        delete confirmPaymentTimers[roomId];
        // Update the orders status to "Rejected"
        const updatedorders = await prisma.orders.update({
          where: { roomId: roomId },
          data: { status: 'Rejected by shopkeeper', statusCode: 5 },
        });
        // Add the orders to issues
        const issue = await prisma.issue.create({
          data: {
            description: 'Payment confirmation timed out',
            order: { connect: { id: updatedorders.id } },
          },
        });
        console.log(`orders rejected and added to issues: ${JSON.stringify(issue)}`);

        // Notify the user and shopkeeper
        io.to(roomId).emit('orderRejected', { roomId, reason: 'Payment confirmation timed out' });
        io.to(roomId).emit('leaveRoom', { roomId });
      }, 1000*confirmPaymentTimerDuration); // Update every second
    });

    // Handle payment confirmation
    socket.on('confirmPayment', async (data) => {
      const roomId = data.roomId;

      clearTimeout(confirmPaymentTimers[roomId]); // Clear the timer if the payment is confirmed
      delete confirmPaymentTimers[roomId];

      await prisma.orders.update({
        where: { roomId: roomId },
        data: { status: 'Payment confirmed by shopkeeper, preparing orders', statusCode: 6 },
      });

      io.to(roomId).emit('paymentConfirmed', data);

      console.log(`Payment confirmed: ${JSON.stringify(data)} in room: ${roomId}`);
    });

    // Handle orders rejection
    socket.on('rejectOrder', async (data) => {
      const roomId = data.roomId;
      clearTimeout(paymentTimers[roomId]); // Clear the payment timer if the orders is rejected
      delete paymentTimers[roomId];

      // orders rejected update the orders status to "Rejected"
      await prisma.orders.update({
        where: { roomId: roomId },
        data: { status: 'Rejected by User', statusCode: 7 },
      });
      
      io.to(roomId).emit('orderRejected', data);
      console.log(`orders rejected: ${JSON.stringify(data)} in room: ${roomId}`);

      io.to(roomId).emit('leaveRoom', { roomId });
    });

    // Handle orders delivery
    socket.on('orderDelivered', async (data) => {
      const roomId = data.roomId;

      const updatedorders = await prisma.orders.update({
        where: { roomId: roomId },
        data: { status: 'Delivered', statusCode: 8 },
      });

      console.log('Room id', roomId);
      console.log('orders delivered:', updatedorders);

      io.to(roomId).emit('orderDelivered', data);
      console.log(`orders delivered: ${JSON.stringify(data)} in room: ${roomId}`);

      io.to(roomId).emit('leaveRoom', { roomId });
    });

    // Handle leaving the room
    socket.on('leaveRoom', (data) => {
      const roomId = data.roomId;
      socket.leave(roomId);
      console.log(`Socket left room: ${roomId}`);
      socket.disconnect();
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};