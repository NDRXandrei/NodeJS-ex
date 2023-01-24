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
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./lib/prisma/validation");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/planets", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const planets = yield client_1.default.planet.findMany();
    response.json(planets);
}));
app.get("/planets/:id(\\d+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = Number(request.params.id);
    const planet = yield client_1.default.planet.findUnique({ where: { id: planetId } });
    if (!planet) {
        response.status(404);
        return next(`Cannot get planet: ${planetId}`);
    }
    response.json(planet);
}));
app.post("/planets", (0, validation_1.validate)({ body: validation_1.planetSchema }), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const planetData = request.body;
    const planet = yield client_1.default.planet.create({ data: planetData });
    response.status(201).json(planet);
}));
app.put("/planets/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.planetSchema }), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = Number(request.params.id);
    const planetData = request.body;
    try {
        const planet = yield client_1.default.planet.update({
            where: { id: planetId },
            data: planetData,
        });
        response.status(200).json(planet);
    }
    catch (error) {
        response.status(404);
        next(`Cannot put planet: ${planetId}`);
    }
}));
app.delete("/planets/:id(\\d+)", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const planetId = Number(request.params.id);
    const planetData = request.body;
    try {
        yield client_1.default.planet.delete({
            where: { id: planetId },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Cannot delete planet: ${planetId}`);
    }
}));
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map