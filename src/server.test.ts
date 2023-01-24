import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const request = supertest(app);

describe("GET /planets", () => {
  test("Valid request", async () => {
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
});

describe("POST /planets", () => {
  test("Valid request", async () => {
    const planet = {
      name: "Mars",
      description: null,
      diameter: 1000,
      moons: 2,
    };

    //@ts-ignore
    prismaMock.planet.create.mockResolvedValue(planet);

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual(planet);
  });

  test("Invalid request", async () => {
    const planet = {
      description: null,
      diameter: 1000,
      moons: 2,
    };

    const response = await request
      .post("/planets")
      .send(planet)
      .expect(422)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toEqual({ errors: { body: expect.any(Array) } });
  });
});
