import express from "express";
import "express-async-errors";

const app = express();

const message = [{ name: "Mars" }];

app.get("/planets", (request, response) => {
  response.json(message);
});

export default app;
