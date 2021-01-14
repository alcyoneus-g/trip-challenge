import amqp from "amqplib";
import { createRandomTrip } from "./utils/seeder-helpers";
import { sleep } from "./utils/utils";
import { randomInt } from "crypto";

// RabbitMQ
const EXCHANGE = "trip_exchange";

async function bootstrap() {
  // Connect rabbitmq producer
  const connection = await amqp.connect({
    hostname: process.env.RABBITMQ_HOST,
    port: Number(process.env.RABBITMQ_PORT),
    username: process.env.RABBITMQ_USERNAME,
    password: process.env.RABBITMQ_PASSWORD,
    vhost: process.env.RABBITMQ_VHOST,
  });
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE, "fanout", { durable: false });

  // send random trip to queue
  while (true) {
    const trip = createRandomTrip();
    channel.publish(EXCHANGE, "", Buffer.from(JSON.stringify(trip)));

    console.log(`Sent trip:${trip.id} to queue`);

    // wait little random time to simulate smooth flow
    await sleep(randomInt(5, 10));
  }
}

bootstrap().then();
