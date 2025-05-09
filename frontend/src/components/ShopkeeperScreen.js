import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:8080');

let acceptOrderTimerInterval;

const ShopkeeperScreen = () => {
  const [roomId, setRoomId] = useState(null);
  const [isAcceptOrderDisabled, setAcceptOrderDisabled] = useState(true);
  const [isConfirmPaymentDisabled, setConfirmPaymentDisabled] = useState(true);
  const [acceptTimer, setAcceptTimer] = useState(null);
  const [confirmPaymentTimer, setConfirmPaymentTimer] = useState(null);
  const [orders, setOrders] = useState([]);
  const shopkeeperId = 'shopkeeper123'; // we will get this from the shopkeeper when he logs in

  useEffect(() => {
    // Register the shopkeeper
    socket.emit('registerShopkeeper', shopkeeperId);

    fetchOrders();

    // Listen for updated order list
    socket.on('updateOrderList', (orders) => {
      setOrders(orders);
    });

    socket.on('orderTimerUpdate', (data) => {
      startAcceptOrderTimer(60 - data.timerLeft);
    });

    socket.on('paymentMade', (data) => {
      console.log('Payment made:', data);
      startConfirmPaymentTimer(60);
      setConfirmPaymentDisabled(false);
    });

    socket.on('leaveRoom', (data) => {
      const { roomId } = data;
      setRoomId(null);
      setAcceptOrderDisabled(true);
      setConfirmPaymentDisabled(true);  
      socket.emit('leaveRoom', { roomId });
      console.log(`Left room: ${roomId}`);
    });

    return () => {
      socket.off('paymentMade');
      socket.off('leaveRoom');
      socket.off('updateOrderList');
    };
  }, []);

  const acceptOrder = () => {
    socket.emit('acceptOrder', { roomId, estimatedTime: '30 minutes' });
    setAcceptOrderDisabled(true);
    stopAcceptOrderTimer();
  };

  const startAcceptOrderTimer = (duration) => {
    clearInterval(acceptOrderTimerInterval);
    setAcceptTimer(duration);
    acceptOrderTimerInterval = setInterval(() => {
      setAcceptTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(acceptOrderTimerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopAcceptOrderTimer = () => {
    clearInterval(acceptOrderTimerInterval);
    setAcceptTimer(null);
  };

  const startConfirmPaymentTimer = (duration) => {
    setConfirmPaymentTimer(duration);
    const timerInterval = setInterval(() => {
      setConfirmPaymentTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const stopConfirmPaymentTimer = () => {
    setConfirmPaymentTimer(null);
  };

  // Fetches orders for shopkeeper
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/shopkeeper/${shopkeeperId}/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const confirmPayment = () => {
    socket.emit('confirmPayment', { roomId });
    setConfirmPaymentDisabled(true);
    stopConfirmPaymentTimer();
  };
  
  const joinRoom = async (roomId) => {
    socket.emit('joinRoom', { roomId, shopkeeperId });
    setRoomId(roomId);
    setAcceptOrderDisabled(false);
  }

  return (
    <div>
      <h1>Shopkeeper Screen</h1>

      {/* Conditionally render extra buttons if the shopkeeper has joined a room */}
      {roomId && (
        <div>
          {confirmPaymentTimer !== null && (
            <p>Time remaining to confirm payment: {confirmPaymentTimer} seconds</p>
          )}
          {acceptTimer !== null && (
            <p>Time remaining to accept order: {acceptTimer} seconds</p>
          )}
          <button onClick={acceptOrder} disabled={isAcceptOrderDisabled}>
            Accept Order
          </button>
          <button onClick={confirmPayment} disabled={isConfirmPaymentDisabled}>
            Confirm Payment
          </button>
        </div>
        )}

        {/* Always show the list of orders */}
        <div>
          <h1>Shopkeeper Orders</h1>
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p>Order ID: {order.id}</p>
                <p>Status: {order.status}</p>
                <p>Total: ${order.total}</p>
                <p>Items: {order.items.join(', ')}</p>
                <button 
                  onClick={() => joinRoom(order.roomId)}
                  disabled={![0, 2, 4].includes(order.statusCode)}
                >
                  Join Room
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default ShopkeeperScreen;