import express from "express";
import "express-async-errors";
import prisma from "../lib/prisma/client";
import {
  validate,
  planetSchema,
  PlanetData,
} from "../../middlewares/middleware/validation";

import { initMulterMiddleware } from "../../middlewares/middleware/multer";
import { checkAuthorization } from "../../middlewares/middleware/passport";

const upload = initMulterMiddleware();

const router = express.Router();

router.get("/planets", async (request, response) => {
  const planets = await prisma.planet.findMany();

  response.json({ planets });
});

router.post(
  "/planets",
  checkAuthorization,
  validate({ body: planetSchema }),
  async (request, response) => {
    const planetData: PlanetData = request.body;

    const planet = await prisma.planet.create({ data: planetData });

    response.status(201).json(planet);
  }
);

router.get("/planets/:id(\\d+)", async (request, response, next) => {
  const planetId = Number(request.params.id);
  const planet = await prisma.planet.findUnique({ where: { id: planetId } });

  if (!planet) {
    response.status(404);
    return next(`Cannot get planet: ${planetId}`);
  }

  response.json(planet);
});

router.put(
  "/planets/:id(\\d+)",
  checkAuthorization,
  validate({ body: planetSchema }),
  async (request, response, next) => {
    const planetId = Number(request.params.id);
    const planetData: PlanetData = request.body;

    try {
      const planet = await prisma.planet.update({
        where: { id: planetId },
        data: planetData,
      });

      response.status(200).json(planet);
    } catch (error) {
      response.status(404);
      next(`Cannot put planet: ${planetId}`);
    }
  }
);

router.delete("/planets/:id(\\d+)", checkAuthorization, async (request, response, next) => {
  const planetId = Number(request.params.id);
  const planetData: PlanetData = request.body;

  try {
    await prisma.planet.delete({
      where: { id: planetId },
    });

    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(`Cannot delete planet: ${planetId}`);
  }
});

router.post(
  "/planets/:id(\\d+)/photo",
  checkAuthorization,
  upload.single("photo"),
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No photo uploaded");
    }

    const photoFileName = request.file.filename;

    response.status(201).json({ photoFileName });
  }
);

export default router;
