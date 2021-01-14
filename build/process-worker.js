"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const trip_calculations_1 = require("./utils/trip-calculations");
// get worker data that is trip object
const trip = worker_threads_1.workerData;
// calculate fields
const result = trip_calculations_1.calculateEnhanceFields(trip);
// send calculated values to parent process
worker_threads_1.parentPort === null || worker_threads_1.parentPort === void 0 ? void 0 : worker_threads_1.parentPort.postMessage(result);
//# sourceMappingURL=process-worker.js.map