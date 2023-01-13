"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const app = (0, express_1.default)();
const message = [{ name: "Mars" }];
app.get("/planets", (request, response) => {
    response.json(message);
});
exports.default = app;
//# sourceMappingURL=app.js.map