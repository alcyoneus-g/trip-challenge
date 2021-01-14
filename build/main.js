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
const dotenv_1 = __importDefault(require("dotenv"));
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const WORKER = path_1.default.join(__dirname, "process-worker.js");
// RabbitMQ
const EXCHANGE = "trip_exchange";
const QUEUE = "trip";
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect rabbitmq consumer
        const connection = yield amqplib_1.default.connect({
            hostname: process.env.RABBITMQ_HOST,
            port: Number(process.env.RABBITMQ_PORT),
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
            vhost: process.env.RABBITMQ_VHOST,
        });
        const channel = yield connection.createChannel();
        yield channel.assertExchange(EXCHANGE, "fanout", { durable: false });
        const q = yield channel.assertQueue("", { exclusive: true });
        yield channel.bindQueue(q.queue, EXCHANGE, "");
        yield channel.consume(q.queue, (message) => {
            if (!message)
                return;
            const trip = JSON.parse(message.content.toString());
            // run calculations in worker thread to not block main thread
            const worker = new worker_threads_1.Worker(WORKER, { workerData: trip });
            worker.on("message", (result) => {
                console.log(result);
            });
        });
        console.log("Started listening for trip events from RabbitMQ...");
    });
}
bootstrap().catch();
//# sourceMappingURL=main.js.map