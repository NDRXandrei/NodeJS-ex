import express from "express";
import "express-async-errors";
import cors from "cors";
import {
  validationErrorMiddleware,
} from "../middlewares/middleware/validation";

const corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

import router from "./routes/routes";

app.use("/", router)

app.use(validationErrorMiddleware);

export default app;
