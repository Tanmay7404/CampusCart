import { createClient } from "redis";
import debug from "debug";
const log = debug("app:common-middleware");

const redisClient = createClient({
  socket: {
    host: "localhost",
    port: 6379,
    reconnectStrategy: (times: any) => {
      return Math.min(times * 50, 2000);
    },
  },
});

// Listen for errors
redisClient.on("error", (err) => {
  log("here is the error", err);
});
export default redisClient;
