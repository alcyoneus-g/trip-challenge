"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureDistance = exports.calculateEnhanceFields = exports.calculateAverageSpeed = exports.calculateTotalDistance = void 0;
/**
 * Calculate total traveled distance for trip object
 *
 * @param trip ITrip
 * @returns number Total traveled distance
 */
function calculateTotalDistance(trip) {
    let totalDistance = 0;
    // to calculate total distance, we sum up difference between every two points
    for (let i = 1; i < trip.dataPoints.length; i++) {
        // calculate distance
        const distance = measureDistance(trip.dataPoints[i].location, trip.dataPoints[i - 1].location);
        // add to total distance
        totalDistance += distance;
    }
    return totalDistance;
}
exports.calculateTotalDistance = calculateTotalDistance;
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
function calculateAverageSpeed(totalDistance, startTime, endTime) {
    // calculate difference and convert to seconds
    const totalTime = (endTime.getTime() - startTime.getTime()) / 1000;
    console.log(totalDistance, totalTime, Math.floor(totalDistance) / Math.floor(totalTime));
    // average speed
    return totalDistance / totalTime;
}
exports.calculateAverageSpeed = calculateAverageSpeed;
/**
 * calculate totalDistance and averageSpeed that we need for enhancing trip data
 *
 * @param trip Trip object
 * @returns object containing total distance and average speed
 */
function calculateEnhanceFields(trip) {
    const totalDistance = calculateTotalDistance(trip);
    const averageSpeed = calculateAverageSpeed(totalDistance, new Date(trip.dataPoints[0].timestamp), new Date(trip.dataPoints[trip.dataPoints.length - 1].timestamp));
    return { totalDistance, averageSpeed };
}
exports.calculateEnhanceFields = calculateEnhanceFields;
/**
 * measures distance between two locations by latitude and longitude
 *
 * @param location1
 * @param location2
 *
 * @returns number distance in meters
 */
function measureDistance(location1, location2) {
    // generally used geo measurement function
    const R = 6378.137; // Radius of earth in KM
    const dLat = (location2.latitude * Math.PI) / 180 - (location1.latitude * Math.PI) / 180;
    const dLon = (location2.longitude * Math.PI) / 180 - (location1.longitude * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((location1.latitude * Math.PI) / 180) *
            Math.cos((location2.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000; // meters
}
exports.measureDistance = measureDistance;
//# sourceMappingURL=trip-calculations.js.map