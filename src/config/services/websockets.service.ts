import { createServer } from "node:http";
import { Server } from "socket.io";
function webSocket(app: any) {
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`disconnect ${socket.id} due to ${reason}`);
    });
  });
}
export { webSocket };
