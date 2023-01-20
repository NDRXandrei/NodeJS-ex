"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const client_mock_1 = require("./lib/prisma/client.mock");
const request = (0, supertest_1.default)(app_1.default);
describe("GET /planets", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planets = [
            {
                id: 1,
                name: "Mars",
                description: null,
                diameter: 1000,
                moons: 2,
                createdAT: "2023-01-18T12:51:00.660Z",
            },
            {
                id: 2,
                name: "Saturn",
                description: null,
                diameter: 5000,
                moons: 0,
                createdAT: "2023-01-18T12:54:33.962Z",
            },
        ];
        //@ts-ignore
        client_mock_1.prismaMock.planet.findMany.mockResolvedValue(planets);
        const response = yield request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planets);
    }));
});
describe("POST /planets", () => {
    test("Valid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            name: "Mars",
            description: null,
            diameter: 1000,
            moons: 2,
        };
        const response = yield request
            .post("/planets")
            .send(planet)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual(planet);
    }));
    test("Invalid request", () => __awaiter(void 0, void 0, void 0, function* () {
        const planet = {
            description: null,
            diameter: 1000,
            moons: 2,
        };
        const response = yield request
            .post("/planets")
            .send(planet)
            .expect(422)
            .expect("Content-Type", /application\/json/);
        expect(response.body).toEqual({ errors: { body: expect.any(Array) } });
    }));
});
//# sourceMappingURL=server.test.js.map