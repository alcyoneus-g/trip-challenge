"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const seeder_helpers_1 = require("../seeder-helpers");
describe("seeder-helper", () => {
    describe("createRandomTimestamp", () => {
        it("should return timestamp shifted from previous time", () => {
            const datetime = '2020-01-05T22:00:05.000Z';
            jest.spyOn(crypto_1.default, "randomInt").mockReturnValueOnce(5000);
            expect(seeder_helpers_1.createRandomTimestamp(datetime)).toBe('2020-01-05T22:00:10.000Z');
        });
    });
});
//# sourceMappingURL=seeder-helper.spec.js.map