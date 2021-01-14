import { parentPort, workerData } from "worker_threads";
import { ITrip } from "./interfaces/trip";
import { calculateEnhanceFields } from "./utils/trip-calculations";

// get worker data that is trip object
const trip = workerData as ITrip;

// calculate fields
const result = calculateEnhanceFields(trip);

// send calculated values to parent process
parentPort?.postMessage(result);
