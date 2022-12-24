function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

import * as fs from "node:fs";

async function dir() {
  luckyDraw().then(
    fs.mkdir(`C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results`, () => {
      return;
    })
  );
}

dir();

const players = ["Tina", "Jorge", "Julien"];

players.forEach((player) => {
  const getResults = async () => {
    try {
      const promise = await luckyDraw(player);
      fs.writeFile(
        `C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${player}.txt`,
        `${player} won a prize in the draw!`,
        () => {
          return;
        }
      );
    } catch (err) {
      fs.writeFile(
        `C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${player}.txt`,
        `${player} lost the draw.`,
        () => {
          return;
        }
      );
    }
  };
  getResults();
});
