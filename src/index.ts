/*******************************************************
 *      Server Starts From Here                        *
 *******************************************************/

import { app } from "./app";
import db from "./db";
import { InitializeRedis } from "./db/redis/index";
import { config } from "../config";
import { webSocket } from "./config/services/websockets.service";
import { configConnectionImg } from "./config/services/image.service";
const PORT = config.server.port || 8000;

// WebSocket
webSocket(app);

// Database Connections
const start = async () => {
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  await InitializeRedis();
  await configConnectionImg();
  // redis.on("error", console.error.bind(console, "Redis connection error:"));
  app.listen(PORT, () => {
    console.log(`| Listening on port http://localhost:${PORT}`);
    console.log("|--------------------------------------------");
  });
};
start();
