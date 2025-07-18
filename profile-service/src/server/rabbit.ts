import amqp from "amqplib";
import { config } from "../config";
import { logger } from "../utils/logger";

export let channel: amqp.Channel;

export const initRabbit = async () => {
  const conn = await amqp.connect(config.rabbitUrl);
  channel = await conn.createChannel();
  await channel.assertQueue("messages");
  logger.info("📬 Connected to RabbitMQ");
};

export const closeRabbit = async () => {
  if (channel) {
    await channel.close();
    logger.info("📬 RabbitMQ connection closed");
  }
};

export const sendToMessageQueue = async (data: any) => {
  channel.sendToQueue("messages", Buffer.from(JSON.stringify(data)));
};
