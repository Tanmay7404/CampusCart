import {createContext} from 'react';
import React from 'react';
import io from 'socket.io-client';
export const SocketContext = createContext();
export const SocketContextProvider = ({children}) => {
  const socket = io('http://localhost:8080', {
    query: {
      shopId: Math.floor(Math.random() * 100),
    },
  });
  //This shopId will help to identify the shop in the backend and send the notification to the correct shop owner.
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
