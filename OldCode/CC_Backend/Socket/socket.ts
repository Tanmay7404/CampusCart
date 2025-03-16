import debug from "debug";
import { Socket } from "socket.io";
const log: debug.IDebugger = debug("app:amqp");

export default (() => {
  class SocketConnection {
    socket: Socket;
    constructor(socket: Socket) {
      this.socket = socket;
      // I have to store this socket id.
      log(socket.id);
    }
  }
  var instance: SocketConnection;
  return {
    getInstance(socket: Socket) {
      if (!instance) {
        instance = new SocketConnection(socket);
      }
      return instance;
    },
    getInstanceOnly() {
      if (!instance) {
        throw new Error("Socket not initialized");
      }
      return instance;
    },
  };
})();
