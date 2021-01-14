import { IDataPoint, ITrip } from "../interfaces/trip";
/**
 * Create a random trip
 *
 * @returns ITrip
 */
export declare function createRandomTrip(): ITrip;
/**
 * Create array of randomly generated data points
 *
 * @returns IDataPoint[]
 */
export declare function createRandomDataPoints(): IDataPoint[];
/**
 * Randomly create data point based on prev point or create new one
 *
 * @param prev
 * @returns IDataPoint
 */
export declare function createRandomDataPoint(prev?: IDataPoint): IDataPoint;
/**
 * Randomly create timestamp by shifting given timestamp forward or create fresh one
 *
 * @param prevTimestamp
 * @returns string Randomly created ISO 8601 datetime string
 */
export declare function createRandomTimestamp(prevTimestamp?: string): string;
/**
 * Randomly create latitude or longitude by shifting given value or create fresh one
 *
 * @param prevCoordination
 * @returns number new randomly created coordination
 */
export declare function createRandomCoordination(prevCoordination?: number): number;
//# sourceMappingURL=seeder-helpers.d.ts.map