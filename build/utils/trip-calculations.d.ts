import { IDataPoint, ITrip } from "../interfaces/trip";
/**
 * Calculate total traveled distance for trip object
 *
 * @param trip ITrip
 * @returns number Total traveled distance
 */
export declare function calculateTotalDistance(trip: ITrip): number;
/**
 * Calculate average speed (total distance / total time) by having total traveled distance,
 * start time and end time
 *
 * @param totalDistance
 * @param startTime
 * @param endTime
 *
 * @returns BigInt average speed of trip
 */
export declare function calculateAverageSpeed(totalDistance: number, startTime: Date, endTime: Date): number;
/**
 * calculate totalDistance and averageSpeed that we need for enhancing trip data
 *
 * @param trip Trip object
 * @returns object containing total distance and average speed
 */
export declare function calculateEnhanceFields(trip: ITrip): {
    totalDistance: number;
    averageSpeed: number;
};
/**
 * measures distance between two locations by latitude and longitude
 *
 * @param location1
 * @param location2
 *
 * @returns number distance in meters
 */
export declare function measureDistance(location1: IDataPoint["location"], location2: IDataPoint["location"]): number;
//# sourceMappingURL=trip-calculations.d.ts.map