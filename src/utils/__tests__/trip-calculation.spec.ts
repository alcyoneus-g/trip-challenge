import {
  calculateAverageSpeed, calculateEnhanceFields,
  calculateTotalDistance,
  measureDistance
} from "../trip-calculations";
import { ITrip } from "../../interfaces/trip";

const trip: ITrip = {
  id: "id1",
  dataPoints: [
    {
      timestamp: "2020-01-05T22:00:10.000Z",
      location: {
        latitude: 80,
        longitude: 100,
      },
      speed: 115,
    },
    {
      timestamp: "2020-01-05T22:00:13.000Z",
      location: {
        latitude: 80.003,
        longitude: 100.001,
      },
      speed: 103,
    },
    {
      timestamp: "2020-01-05T22:00:15.000Z",
      location: {
        latitude: 80.004,
        longitude: 100.002,
      },
      speed: 145,
    },
  ],
};

describe("trip-calculation", () => {
  describe("measureDistance", () => {
    it("should measure distance between two coordination", () => {
      const measure = measureDistance(trip.dataPoints[0].location, trip.dataPoints[1].location);
      expect(measure).toBeCloseTo(334.517);
    });
  });

  describe("calculateTotalDistance", () => {
    it("should calculate total distance of trip", () => {
      const distance = calculateTotalDistance(trip);
      expect(distance).toBeCloseTo(447.5);
    });
  });

  describe("calculateAverageSpeed", () => {
    it("should calculate average speed", () => {
      const speed = calculateAverageSpeed(
        447.5,
        new Date("2020-01-05T22:00:10.000Z"),
        new Date("2020-01-05T22:00:15.000Z")
      );

      expect(speed).toBeCloseTo(89.5);
    });
  });

  describe('calculateEnhanceFields', () => {
    it('should calculate total distance and average speed', () => {
      const result = calculateEnhanceFields(trip);

      expect(result.totalDistance).toBeCloseTo(447.5);
      expect(result.averageSpeed).toBeCloseTo(89.5);
    })
  })
});
