import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:8080');

const ShopkeeperScreen = () => {
  const [roomId, setRoomId] = useState(null);
  const [isAcceptOrderDisabled, setAcceptOrderDisabled] = useState(true);
  const [isConfirmPaymentDisabled, setConfirmPaymentDisabled] = useState(true);
  const [remainingTime, setRemainingTime] = useState(null);
  const [confirmPaymentTimeRemaining, setConfirmPaymentTimeRemaining] = useState(null);

  useEffect(() => {
    // Register the shopkeeper
    const shopkeeperId = 'shopkeeper123'; // we will get this from the shopkeeper when he logs in
    socket.emit('registerShopkeeper', shopkeeperId);

    socket.on('joinRoom', (data) => {
      const { roomId } = data;
      setRoomId(roomId);
      socket.emit('joinRoom', { roomId });
      setAcceptOrderDisabled(false);
      console.log(`Joined room: ${roomId}`);
    });
    // socket.on('orderPlaced', (order) => {
    //   setRoomId(order.roomId);
    //   console.log('Order placed:', order);
    //   setAcceptOrderDisabled(false);
    // });

    socket.on('timerUpdate', (data) => {
      setRemainingTime(data.remainingTime);
    });

    socket.on('confirmPaymentTimerUpdate', (data) => {  
      setConfirmPaymentTimeRemaining(data.confirmPaymentRemainingTime);
    });

    socket.on('orderAccepted', (data) => {
      setRemainingTime(null);
    });

    socket.on('paymentMade', (data) => {
      console.log('Payment made:', data);
      setConfirmPaymentDisabled(false);
    });

    socket.on('leaveRoom', (data) => {
      const { roomId } = data;
      socket.emit('leaveRoom', { roomId });
      console.log(`Left room: ${roomId}`);
    });

    return () => {
      socket.off('joinRoom');
      socket.off('timerUpdate');
      socket.off('paymentMade');
      socket.off('leaveRoom');
    };
  }, []);

  const acceptOrder = () => {
    socket.emit('acceptOrder', { roomId, estimatedTime: '30 minutes' });
    setAcceptOrderDisabled(true);
  };

  const confirmPayment = () => {
    socket.emit('confirmPayment', { roomId });
    setConfirmPaymentDisabled(true);
    setConfirmPaymentTimeRemaining(null);
  };

  return (
    <div>
      <h1>Shopkeeper Screen</h1>
      {confirmPaymentTimeRemaining !== null && <p>Time remaining to confirm payment: {confirmPaymentTimeRemaining} seconds</p>}
      {remainingTime !== null && <p>Time remaining to accept order: {remainingTime} seconds</p>}
      <button onClick={acceptOrder} disabled={isAcceptOrderDisabled}>Accept Order</button>
      <button onClick={confirmPayment} disabled={isConfirmPaymentDisabled}>Confirm Payment</button>
    </div>
  );
};

export default ShopkeeperScreen;