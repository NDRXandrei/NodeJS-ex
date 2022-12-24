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

const players = ["Joe", "Caroline", "Sabrina"];

luckyDraw().then(
  fs.mkdir(`C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results`, () => {
    return;
  })
);

players.forEach((player) =>
  luckyDraw(player)
    .then((i) => {
      fs.writeFile(
        `C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${player}.txt`,
        `${i}`,
        () => {
          return;
        }
      );
    })
    .catch((err) => {
      fs.writeFile(
        `C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${player}.txt`,
        `${err.message}`,
        () => {
          return;
        }
      );
    })
);
