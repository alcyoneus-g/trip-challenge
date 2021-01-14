export interface IDataPoint {
    timestamp: string;
    location: {
        latitude: number;
        longitude: number;
    };
    speed: number;
}
export interface ITrip {
    id: string;
    dataPoints: IDataPoint[];
}
export interface IEnhancedTrip extends ITrip {
    averageSpeed: number;
    totalDistance: number;
}
//# sourceMappingURL=trip.d.ts.map