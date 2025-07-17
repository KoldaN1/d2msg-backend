import { Server } from "socket.io";
import { logger } from "../utils/logger";
import { handleMessageEvents } from "./message";
import { verifyToken } from "../utils/jwt";
import { config } from "../config";

export const registerSocketHandlers = (io: Server) => {
  io.use((socket, next) => {
    const origin = socket.handshake.headers.origin ?? "";

    if (!config.isDev && !origin.startsWith(config.clientUrl)) {
      return next(new Error("Origin not allowed"));
    }

    const token = socket.handshake.auth?.token || socket.handshake.headers?.token;
    if (!token) return next(new Error("No token"));

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    socket.join(userId);

    if (config.isDev) logger.info(`🔌 User connected: ${userId}`);

    handleMessageEvents(socket);

    socket.on("disconnect", () => {
      if (config.isDev) logger.info(`❌ Disconnected: ${userId}`);
    });

    socket.on("error", (err) => {
      logger.error(`Socket error from ${socket.id} (user: ${userId}): ${err.message}`);
    });
  });
};

export const emitToUsers = async (io: Server, userIds: string[], event: string, data: any, batchSize = 5000) => {
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);
    for (const id of batch) {
      io.to(id).emit(event, data);
    }
  }
};
