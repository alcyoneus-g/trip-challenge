import random from "random";
import { v4 as uuidv4 } from "uuid";
import { IDataPoint, ITrip } from "../interfaces/trip";

/**
 * Create a random trip
 *
 * @returns ITrip
 */
export function createRandomTrip(): ITrip {
  return {
    id: uuidv4(),
    dataPoints: createRandomDataPoints(),
  };
}

/**
 * Create array of randomly generated data points
 *
 * @returns IDataPoint[]
 */
export function createRandomDataPoints(): IDataPoint[] {
  const points = Array(random.int(1000, 100_000)).fill(0);
  for (let idx = 0; idx < points.length; idx++) {
    points[idx] = createRandomDataPoint(idx > 0 ? points[idx - 1] : undefined);
  }

  return points;
}

/**
 * Randomly create data point based on prev point or create new one
 *
 * @param prev
 * @returns IDataPoint
 */
export function createRandomDataPoint(prev?: IDataPoint): IDataPoint {
  return {
    timestamp: createRandomTimestamp(prev?.timestamp),
    location: {
      latitude: createRandomCoordination(prev?.location?.latitude),
      longitude: createRandomCoordination(prev?.location?.longitude),
    },
    speed: random.int(10, 400),
  };
}

/**
 * Randomly create timestamp by shifting given timestamp forward or create fresh one
 *
 * @param prevTimestamp
 * @returns string Randomly created ISO 8601 datetime string
 */
export function createRandomTimestamp(prevTimestamp?: string): string {
  // make random timestamp based on prev point or start of trip
  const millis = prevTimestamp
    ? new Date(prevTimestamp).getTime() + random.int(10, 60_000) // move time by random value
    : (random.int(0, 300000) * 1000000) + 1400000000000; // create random value

  return new Date(millis).toISOString();
}

/**
 * Randomly create latitude or longitude by shifting given value or create fresh one
 *
 * @param prevCoordination
 * @returns number new randomly created coordination
 */
export function createRandomCoordination(prevCoordination?: number): number {
  return prevCoordination
    ? prevCoordination + ((random.bool() ? -1 : 1) * random.float(0.0001, 1))
    : random.float(-100, 100);
}
