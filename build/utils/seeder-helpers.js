"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomCoordination = exports.createRandomTimestamp = exports.createRandomDataPoint = exports.createRandomDataPoints = exports.createRandomTrip = void 0;
const random_1 = __importDefault(require("random"));
const uuid_1 = require("uuid");
/**
 * Create a random trip
 *
 * @returns ITrip
 */
function createRandomTrip() {
    return {
        id: uuid_1.v4(),
        dataPoints: createRandomDataPoints(),
    };
}
exports.createRandomTrip = createRandomTrip;
/**
 * Create array of randomly generated data points
 *
 * @returns IDataPoint[]
 */
function createRandomDataPoints() {
    const points = Array(random_1.default.int(1000, 100000)).fill(0);
    for (let idx = 0; idx < points.length; idx++) {
        points[idx] = createRandomDataPoint(idx > 0 ? points[idx - 1] : undefined);
    }
    return points;
}
exports.createRandomDataPoints = createRandomDataPoints;
/**
 * Randomly create data point based on prev point or create new one
 *
 * @param prev
 * @returns IDataPoint
 */
function createRandomDataPoint(prev) {
    var _a, _b;
    return {
        timestamp: createRandomTimestamp(prev === null || prev === void 0 ? void 0 : prev.timestamp),
        location: {
            latitude: createRandomCoordination((_a = prev === null || prev === void 0 ? void 0 : prev.location) === null || _a === void 0 ? void 0 : _a.latitude),
            longitude: createRandomCoordination((_b = prev === null || prev === void 0 ? void 0 : prev.location) === null || _b === void 0 ? void 0 : _b.longitude),
        },
        speed: random_1.default.int(10, 400),
    };
}
exports.createRandomDataPoint = createRandomDataPoint;
/**
 * Randomly create timestamp by shifting given timestamp forward or create fresh one
 *
 * @param prevTimestamp
 * @returns string Randomly created ISO 8601 datetime string
 */
function createRandomTimestamp(prevTimestamp) {
    // make random timestamp based on prev point or start of trip
    const millis = prevTimestamp
        ? new Date(prevTimestamp).getTime() + random_1.default.int(10, 60000) // move time by random value
        : (random_1.default.int(0, 300000) * 1000000) + 1400000000000; // create random value
    return new Date(millis).toISOString();
}
exports.createRandomTimestamp = createRandomTimestamp;
/**
 * Randomly create latitude or longitude by shifting given value or create fresh one
 *
 * @param prevCoordination
 * @returns number new randomly created coordination
 */
function createRandomCoordination(prevCoordination) {
    return prevCoordination
        ? prevCoordination + ((random_1.default.bool() ? -1 : 1) * random_1.default.float(0.0001, 10))
        : random_1.default.float(-1000, 1000);
}
exports.createRandomCoordination = createRandomCoordination;
//# sourceMappingURL=seeder-helpers.js.map