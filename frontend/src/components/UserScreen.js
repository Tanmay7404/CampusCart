import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const UserScreen = () => {
  const [roomId, setRoomId] = useState(null);
  const [isPlaceOrderDisabled, setPlaceOrderDisabled] = useState(false);
  const [isMakePaymentDisabled, setMakePaymentDisabled] = useState(true);
  const [isRejectOrderDisabled, setRejectOrderDisabled] = useState(true);
  const [isOrderDeliveredDisabled, setOrderDeliveredDisabled] = useState(true);
  const [frontendTimer, setFrontendTimer] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    socket.on('orderPlaced', (order) => {
      setRoomId(order.roomId);
      setOrder(order.order);
      console.log('Order placed:', order);
    });

    socket.on('orderAccepted', (data) => {
      console.log('Order accepted:', data);
      setMakePaymentDisabled(false);
      startFrontendTimer(60);
      setRejectOrderDisabled(false);
    });

    socket.on('paymentConfirmed', (data) => {
      console.log('Payment confirmed:', data);
      setOrderDeliveredDisabled(false);
    });

    socket.on('leaveRoom', (data) => {
      const { roomId } = data;
      setRoomId(null);
      setOrder(null);
      setMakePaymentDisabled(true);
      setRejectOrderDisabled(true);
      setOrderDeliveredDisabled(true);
      setPlaceOrderDisabled(false);
      socket.emit('leaveRoom', { roomId });
      console.log(`Left room: ${roomId}`);
    });

    return () => {
      socket.off('orderPlaced');
      socket.off('orderAccepted');
      socket.off('paymentTimerUpdate');
      socket.off('paymentConfirmed');
      socket.off('leaveRoom');
    };
  }, []);

  const startFrontendTimer = (duration) => {
    setFrontendTimer(duration);
    const timerInterval = setInterval(() => {
      setFrontendTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopFrontendTimer = () => {
    setFrontendTimer(null);
  };

  const placeOrder = () => {
    // we get this order from frontend
    const order = {
      userId: 'user456',
      shopkeeperId: 'shopkeeper123',
      items: ['item1', 'item2'],
      total: 100
    };
    socket.emit('placeOrder', order);
    setPlaceOrderDisabled(true);
  };

  const makePayment = () => {
    socket.emit('makePayment', { roomId, order });
    setMakePaymentDisabled(true);
    stopFrontendTimer();
    setRejectOrderDisabled(true);
    // setPaymentTimeRemaining(null);
  };

  const rejectOrder = () => {
    socket.emit('rejectOrder', { roomId });
    setMakePaymentDisabled(true);
    stopFrontendTimer();
    setRejectOrderDisabled(true);
    // setPaymentTimeRemaining(null)
  };

  const orderDelivered = async () => {
    // save the order object in prisma 
    socket.emit('orderDelivered', { roomId, order });
    setOrderDeliveredDisabled(true);
  };

  return (
    <div>
      <h1>User Screen</h1>
      {frontendTimer !== null && <p>Time remaining to make payment: {frontendTimer} seconds</p>}
      <button onClick={placeOrder} disabled={isPlaceOrderDisabled}>Place Order</button>
      <button onClick={makePayment} disabled={isMakePaymentDisabled}>Make Payment</button>
      <button onClick={rejectOrder} disabled={isRejectOrderDisabled}>Reject Order</button>
      <button onClick={orderDelivered} disabled={isOrderDeliveredDisabled}>Order Delivered</button>
    </div>
  );
};

export default UserScreen;