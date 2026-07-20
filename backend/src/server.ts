import app from "./app";
import { env } from "./config/env";
import http from "http";
import { initSocket } from "./socket/socket";


const server = http.createServer(app);


// Initialize Socket.IO
initSocket(server);


server.listen(
  env.PORT,
  () => {
    console.log(
      `Server running on port ${env.PORT}`
    );
  }
);