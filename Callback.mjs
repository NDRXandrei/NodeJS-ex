import * as fs from "node:fs/promises";

async function read() {
  const dir = await fs.readdir(
    "C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results",
    {
      encoding: "utf-8",
    }
  );

  dir.forEach(async (i) => {
    const file = fs.readFile(
      `C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${i}`,
      {
        encoding: "utf-8",
      }
    );

    const message = await file;

    console.log(message);
  });
}

read();