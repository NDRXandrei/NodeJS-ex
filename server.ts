import express from "express";
import "express-async-errors";

const app = express();

const message = "Server On";

app.get("/", (request, response) => {
  response.send(message);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
