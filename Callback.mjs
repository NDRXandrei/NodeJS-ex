import * as fs from "node:fs/promises";

fs.readdir("C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results", {
  encoding: "utf-8",
}).then((i) => {
  i.forEach((i) => {
    fs.readFile(`C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/results/${i}`, {
      encoding: "utf-8",
    }).then((i) => {
      console.log(i);
    });
  });
});
