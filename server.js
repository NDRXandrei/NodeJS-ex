"use strict";
exports.__esModule = true;
var express_1 = require("express");
require("express-async-errors");
var app = (0, express_1["default"])();
var message = "Server O";
app.get("/", function (request, response) {
    response.send(message);
});
var port = 3000;
app.listen(port, function () {
    console.log("Server running at http://localhost:".concat(port));
});
