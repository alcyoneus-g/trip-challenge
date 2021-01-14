"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
const seeder_helpers_1 = require("./utils/seeder-helpers");
const utils_1 = require("./utils/utils");
const crypto_1 = require("crypto");
// RabbitMQ
const EXCHANGE = "trip_exchange";
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect rabbitmq producer
        const connection = yield amqplib_1.default.connect({
            hostname: process.env.RABBITMQ_HOST,
            port: Number(process.env.RABBITMQ_PORT),
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
            vhost: process.env.RABBITMQ_VHOST,
        });
        const channel = yield connection.createChannel();
        yield channel.assertExchange(EXCHANGE, "fanout", { durable: false });
        // send random trip to queue
        while (true) {
            const trip = seeder_helpers_1.createRandomTrip();
            channel.publish(EXCHANGE, "", Buffer.from(JSON.stringify(trip)));
            console.log(`Sent trip:${trip.id} to queue`);
            // wait little random time to simulate smooth flow
            yield utils_1.sleep(crypto_1.randomInt(5, 10));
        }
    });
}
bootstrap().then();
//# sourceMappingURL=seeder.js.map