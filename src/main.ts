import amqp from "amqplib";
import dotenv from "dotenv";
import { ITrip } from "./interfaces/trip";
import { Worker } from "worker_threads";
import path from "path";
import axios from "axios";

dotenv.config();

const WORKER = path.join(__dirname, "process-worker.js");

// RabbitMQ
const EXCHANGE = "trip_exchange";

async function bootstrap() {
  // Connect rabbitmq consumer
  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    vhost: process.env.RABBITMQ_VHOST,
  });
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "fanout", { durable: false });
  const q = await channel.assertQueue("", { exclusive: true });
  await channel.bindQueue(q.queue, EXCHANGE, "");

  await channel.consume(q.queue, (message) => {
    if (!message) return;
    const trip = <ITrip>JSON.parse(message.content.toString());

    // run calculations in worker thread to not block main thread
    const worker = new Worker(WORKER, { workerData: trip });
    worker.on("message", (result) => {
      // create enhanced trip object
      const enhancedTrip = {
        ...trip,
        ...result,
      };

      console.log(result);

      // push enhanced trip to specified endpoint
      if (process.env.PUSH_DESTINATION) {
        axios.post(process.env.PUSH_DESTINATION, enhancedTrip);
      }
    });
  });

  console.log("Started listening for trip events from RabbitMQ...");
}

bootstrap().catch();
