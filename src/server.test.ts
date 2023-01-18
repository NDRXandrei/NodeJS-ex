import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

test("GET /planets", async () => {
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
  prismaMock.planet.findMany.mockResolvedValue(planets);

  const response = await request
    .get("/planets")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toEqual(planets);
});

test("POST /planets", async () => {
  const planet = {
    id: 1,
    name: "Mars",
    description: null,
    diameter: 1000,
    moons: 2,
  };

  const response = await request
    .post("/planets")
    .send(planet)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.body).toEqual(planet);
});
