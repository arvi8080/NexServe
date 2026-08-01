import app from "./app";
import { env } from "./config/env";
import http from "http";
import { initSocket } from "./socket/socket";

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

const PORT = Number(process.env.PORT || env.PORT || 5000);
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`GlowHome Server running on http://${HOST}:${PORT}`);
});