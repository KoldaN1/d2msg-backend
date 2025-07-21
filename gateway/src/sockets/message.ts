import { Socket } from "socket.io";
import { sendToMessageQueue } from "../server/rabbit";
import { v4 as uuidv4 } from "uuid";

export const handleMessageEvents = (socket: Socket) => {
  socket.on("sendMessage", async (data, callback) => {
    const message = {
      userId: socket.data.userId,
      text: data.text,
      timestamp: new Date().toISOString(),
      chatId: data.chatId,
      messageId: uuidv4(),
    };

    await sendToMessageQueue(message);

    callback({ success: true, status: "queued", messageId: message.messageId });
  });
};
