import random from "random";
import {
  createRandomCoordination,
  createRandomDataPoint,
  createRandomDataPoints,
  createRandomTimestamp,
  createRandomTrip,
} from "../seeder-helpers";

jest.mock("uuid");

import { v4 as uuidv4 } from "uuid";
import { MaybeMocked } from "ts-jest/dist/utils/testing";

describe("seeder-helper", () => {
  describe("createRandomTimestamp", () => {
    it("should return timestamp shifted from previous time", () => {
      jest.spyOn(random, "int").mockReturnValueOnce(5000);

      expect(createRandomTimestamp("2020-01-05T22:00:05.000Z")).toBe("2020-01-05T22:00:10.000Z");
    });

    it("should return fresh timestamp", () => {
      jest.spyOn(random, "int").mockReturnValueOnce(250000);

      expect(createRandomTimestamp()).toBe("2022-04-15T05:20:00.000Z");
    });
  });

  describe("createRandomCoordination", () => {
    it("should return coordination shifted from previous value", () => {
      jest.spyOn(random, "bool").mockReturnValueOnce(true);
      jest.spyOn(random, "float").mockReturnValueOnce(0.019);

      expect(createRandomCoordination(81)).toBe(80.981);
    });

    it("should return coordination shifted from previous value in forward direction", () => {
      jest.spyOn(random, "bool").mockReturnValueOnce(false);
      jest.spyOn(random, "float").mockReturnValueOnce(0.019);

      expect(createRandomCoordination(81)).toBe(81.019);
    });

    it("should return fresh coordination", () => {
      jest.spyOn(random, "float").mockReturnValueOnce(93.019);

      expect(createRandomCoordination()).toBe(93.019);
    });
  });

  describe("createRandomDataPoint", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create random data point", () => {
      jest.spyOn(random, "int").mockReturnValue(20);
      jest.spyOn(random, "float").mockReturnValue(91.139);
      jest.spyOn(random, "bool").mockReturnValue(true);

      const point = createRandomDataPoint();
      expect(point.timestamp).toBe("2014-05-13T22:26:40.000Z");
      expect(point.location.longitude).toBe(91.139);
      expect(point.location.latitude).toBe(91.139);
      expect(point.speed).toBe(20);
    });

    it("should create random data points", () => {
      jest.spyOn(random, "int").mockReturnValue(20);
      jest.spyOn(random, "float").mockReturnValue(0.01);
      jest.spyOn(random, "bool").mockReturnValue(false);

      const points = createRandomDataPoints();
      expect(points).toHaveLength(20);
      expect(points[0].timestamp).toBe("2014-05-13T22:26:40.000Z");
      expect(points[0].location.latitude).toBe(0.01);
      expect(points[0].location.longitude).toBe(0.01);
      expect(points[0].speed).toBe(20);

      expect(points[1].timestamp).toBe("2014-05-13T22:26:40.020Z");
      expect(points[1].location.latitude).toBe(0.02);
      expect(points[1].location.longitude).toBe(0.02);
      expect(points[1].speed).toBe(20);

      expect(points[19].timestamp).toBe("2014-05-13T22:26:40.380Z");
      expect(points[19].location.latitude).toBeCloseTo(0.2);
      expect(points[19].location.longitude).toBeCloseTo(0.2);
      expect(points[19].speed).toBe(20);
    });
  });

  describe("should create trip", function () {
    jest.spyOn(random, "int").mockReturnValue(20);
    jest.spyOn(random, "float").mockReturnValue(0.01);
    jest.spyOn(random, "bool").mockReturnValue(false);

    const id = "0538ce01-08e4-447a-84ec-1d771cfc1579";
    (uuidv4 as MaybeMocked<typeof uuidv4>).mockReturnValue(id);
    const trip = createRandomTrip();
    expect(trip.id).toBe(id);
    expect(trip.dataPoints).toHaveLength(20);
  });
});
