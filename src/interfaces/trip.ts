export interface IDataPoint {
  timestamp: string; // ISO-8601 timestamp
  location: {
    latitude: number;
    longitude: number;
  };
  speed: number; // meters per second
}

export interface ITrip {
  id: string; // random unique ID
  dataPoints: IDataPoint[]; // each trip must have at least 1000 data points
}

export interface IEnhancedTrip extends ITrip {
  averageSpeed: number; // meters per second
  totalDistance: number; // meters
}
