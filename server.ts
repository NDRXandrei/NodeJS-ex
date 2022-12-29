import express from "express";
import "express-async-errors";

const app = express();

const message = "Server O";

app.get("/", (request, response) => {
  response.send(message);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
