import { Server } from 'socket.io';
import http from 'http';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const shopkeeperSockets: { [key: string]: string } = {};
const orderTimers: { [key: string]: NodeJS.Timeout } = {};
const paymentTimers: { [key: string]: NodeJS.Timeout } = {};
const confirmPaymentTimers: { [key: string]: NodeJS.Timeout } = {};

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

    // Handle order placement
    socket.on('placeOrder', (order) => {
      const roomId = `order_${order.userId}_${order.shopkeeperId}`; // Unique room ID
      socket.join(roomId);
      io.to(roomId).emit('orderPlaced', { order, roomId });
      console.log(`Order placed: ${JSON.stringify(order)} in room: ${roomId}`);
      // Notify the shopkeeper to join the room
      const shopkeeperSocketId = shopkeeperSockets[order.shopkeeperId];
      if (shopkeeperSocketId) {
        io.to(shopkeeperSocketId).emit('joinRoom', { roomId });
      }

      // start timer
      const timerDuration = 60;
      let remainingTime = timerDuration;
      orderTimers[roomId] = setInterval(() => {
        remainingTime -= 1;
        io.to(roomId).emit('timerUpdate', { roomId, remainingTime });

        if (remainingTime <= 0) {
          clearInterval(orderTimers[roomId]);
          delete orderTimers[roomId];
          io.to(roomId).emit('orderRejected', { roomId, reason: 'Order timed out' });
          console.log(`Order timed out: ${roomId}`);
          io.to(roomId).emit('leaveRoom', { roomId });
        }
      }, 1000); // Update every second
    });

    // Handle shopkeeper joining the room
    socket.on('joinRoom', (data) => {
      const { roomId } = data;
      socket.join(roomId);
      console.log(`Shopkeeper joined room: ${roomId}`);
    });

    // Handle order acceptance
    socket.on('acceptOrder', (data) => {
      const roomId = data.roomId;
      clearInterval(orderTimers[roomId]); // Clear the timer if the order is accepted
      delete orderTimers[roomId];
      io.to(roomId).emit('orderAccepted', data);
      console.log(`Order accepted: ${JSON.stringify(data)} in room: ${roomId}`);

      // Start a payment timer for the user
      const paymentTimerDuration = 60; // 60 seconds
      let paymentRemainingTime = paymentTimerDuration;
      paymentTimers[roomId] = setInterval(() => {
        paymentRemainingTime -= 1;
        io.to(roomId).emit('paymentTimerUpdate', { roomId, paymentRemainingTime });

        if (paymentRemainingTime <= 0) {
          clearInterval(paymentTimers[roomId]);
          delete paymentTimers[roomId];
          io.to(roomId).emit('orderRejected', { roomId, reason: 'Payment timed out' });
          console.log(`Payment timed out: ${roomId}`);
          io.to(roomId).emit('leaveRoom', { roomId });
        }
      }, 1000); // Update every second
    });

    // Handle payment
    socket.on('makePayment', (data) => {
      const order = data.order;
      const roomId = data.roomId;
      clearInterval(paymentTimers[roomId]); // Clear the timer if the payment is made
      delete paymentTimers[roomId];
      io.to(roomId).emit('paymentMade', data);
      console.log(`Payment made: ${JSON.stringify(data)} in room: ${roomId}`);

      // Start a confirmation timer for the shopkeeper
      const confirmPaymentTimerDuration = 60; // 60 seconds
      let confirmPaymentRemainingTime = confirmPaymentTimerDuration;
      confirmPaymentTimers[roomId] = setInterval(async () => {
        confirmPaymentRemainingTime -= 1;
        io.to(roomId).emit('confirmPaymentTimerUpdate', { roomId, confirmPaymentRemainingTime });

        if (confirmPaymentRemainingTime <= 0) {
          clearInterval(confirmPaymentTimers[roomId]);
          delete confirmPaymentTimers[roomId];
          // add it to issues as user might have paid but shopkeeper didn't confirm
          const createdOrder = await prisma.order.create({
            data: {
              userId: order.userId,
              shopId: order.shopkeeperId,
              items: order.items,
              total: order.total
            },
          });

          console.log(`Order created: ${JSON.stringify(createdOrder)}`);

          const issue = await prisma.issue.create({
            data: {
              description: 'Shopkeeper did not confirm payment',
              order: {
                connect: {
                  id: createdOrder.id
                }
              },
            }
          });

          console.log(`Issue created: ${JSON.stringify(issue)}`);

          io.to(roomId).emit('orderRejected', { roomId, reason: 'Payment confirmation timed out' });
          console.log(`Payment confirmation timed out: ${roomId}`);
          io.to(roomId).emit('leaveRoom', { roomId });
        }
      }, 1000); // Update every second
    });

    // Handle payment confirmation
    socket.on('confirmPayment', (data) => {
      const roomId = data.roomId;
      clearInterval(confirmPaymentTimers[roomId]); // Clear the timer if the payment is confirmed
      delete confirmPaymentTimers[roomId];
      io.to(roomId).emit('paymentConfirmed', data);
      console.log(`Payment confirmed: ${JSON.stringify(data)} in room: ${roomId}`);
    });

    // Handle order rejection
    socket.on('rejectOrder', (data) => {
      const roomId = data.roomId;
      clearInterval(paymentTimers[roomId]); // Clear the payment timer if the order is rejected
      delete paymentTimers[roomId];
      io.to(roomId).emit('orderRejected', data);
      console.log(`Order rejected: ${JSON.stringify(data)} in room: ${roomId}`);

      io.to(roomId).emit('leaveRoom', { roomId });
    });

    // Handle order delivery
    socket.on('orderDelivered', async (data) => {
      const order = data.order;
      const roomId = data.roomId;
      console.log('Room id', roomId);
      console.log('Order delivered:', order);

      const createdOrder = await prisma.order.create({
        data: {
          userId: order.userId,
          shopId: order.shopkeeperId,
          items: order.items,
          total: order.total,
          issueId: null
        },
      });
      console.log(`Order created: ${JSON.stringify(createdOrder)}`);

      io.to(roomId).emit('orderDelivered', data);
      console.log(`Order delivered: ${JSON.stringify(data)} in room: ${roomId}`);

      io.to(roomId).emit('leaveRoom', { roomId });
    });

    // Handle leaving the room
    socket.on('leaveRoom', (data) => {
      const { roomId } = data;
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