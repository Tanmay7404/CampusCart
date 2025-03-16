import pubSubServices from "../MessageQueue/pubSub.services";
import socketConnection from "../Socket/socket";
const sendNotification = () => {
  pubSubServices.consumeFromQueue("ORDER", async (data: any) => {
    console.log(data);
    socketConnection
      .getInstanceOnly()
      .socket.emit("newOrder", data.content.toString());
  });
};
export default sendNotification;
