import { handleMessageEvents } from "../src/sockets/message";
import { sendToMessageQueue } from "../src/server/rabbit";
import { v4 as uuidv4 } from "uuid";

jest.mock("../src/server/rabbit", () => ({
  sendToMessageQueue: jest.fn(() => Promise.resolve()),
}));

jest.mock("uuid");

describe("handleMessageEvents", () => {
  let socket: any;
  let callback: jest.Mock;
  let sendMessageHandler: Function;

  beforeEach(() => {
    callback = jest.fn();

    socket = {
      data: { userId: "user123" },
      on: jest.fn((event, handler) => {
        if (event === "sendMessage") {
          sendMessageHandler = handler;
        }
      }),
    };

    (sendToMessageQueue as jest.Mock).mockResolvedValue(true);
    (uuidv4 as jest.Mock).mockReturnValue("uuid-1234");
  });

  it("should handle sendMessage event", async () => {
    handleMessageEvents(socket);

    await sendMessageHandler({ text: "hello", chatId: "chat1" }, callback);

    expect(sendToMessageQueue).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user123",
        text: "hello",
        chatId: "chat1",
        messageId: "uuid-1234",
      })
    );

    expect(callback).toHaveBeenCalledWith({
      success: true,
      status: "queued",
      messageId: "uuid-1234",
    });
  });
});
