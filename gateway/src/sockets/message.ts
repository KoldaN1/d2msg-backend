import { Socket } from "socket.io";
import { sendToMessageQueue } from "../server/rabbit";

export const handleMessageEvents = (socket: Socket) => {
  socket.on("sendMessage", async (data) => {
    const message = {
      userId: socket.data.userId,
      text: data.text,
      timestamp: new Date().toISOString(),
      chatId: data.chatId,
    };

    await sendToMessageQueue(message);

    socket.emit("messageSent", { status: "queued" });
  });
};
