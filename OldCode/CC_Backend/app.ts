import express from "express";
import * as http from "http";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import dotenv from "dotenv";
import socketConnection from "./Socket/socket";
const dotenvResult = dotenv.config({ path: "./.env" });
if (dotenvResult.error) {
  throw dotenvResult.error;
}
import debug from "debug";
const debugLog: debug.IDebugger = debug("app");
import { CommonRoutesConfig } from "./common/routes/common.routes.config";
import { UsersRoutes } from "./users/routes/users.routes.config";
import { OrderRoutes } from "./order/routes/order.routes.config";
import { ShopRoutes } from "./shop/routes/shop.routes.config";
import { ItemRoutes } from "./shop/routes/item.routes.config";
import helmet from "helmet";
import { Message } from "amqplib";
import { Server } from "socket.io";
import redisClient from "./NotificationService/redis";

const app: express.Application = express();
const httpServer: http.Server = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    //hey there
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false; // when not debugging, log requests as one-liners
  if (typeof global.it === "function") {
    loggerOptions.level = "http"; // for non-debug test runs (when jest is being used), squelch entirely
  }
}

io.on("connection", (socket) => {
  let socketId: string;
  let shopId: string;
  socketConnection.getInstance(socket);
  console.log("info", "a user connected", socket.handshake.query.shopId);
  socketId = socket.id;
  shopId = socket.handshake.query.shopId as string;
  redisClient.once("ready", () => {
    debugLog("redis is ready");
    redisClient.hSet("onlineShops", socketId, shopId).then((result) => {});
  });
  socket.on("disconnect", () => {
    const disconnectedSocketId: string = socket.id;
    redisClient.hDel("onlineShops", disconnectedSocketId).then((result) => {
      console.log(result);
    });
    console.log("info", "a user disconnected");
  });
});
const port = 8080;
const routes: Array<CommonRoutesConfig> = [];

app.use(helmet());
app.use(express.json());

app.use(cors());

app.use(expressWinston.logger(loggerOptions));
routes.push(new UsersRoutes(app));
routes.push(new OrderRoutes(app));
routes.push(new ShopRoutes(app));
routes.push(new ItemRoutes(app));

const runningMessage = `Server running at http://localhost:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send(runningMessage);
});
export default httpServer.listen(port, () => {
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  console.log(runningMessage);
});
