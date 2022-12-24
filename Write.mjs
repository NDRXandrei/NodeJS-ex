import * as fs from "node:fs";

const content = "Fantastico";

fs.writeFile(
  "C:/Users/ndrx5/Desktop/NodeJS/NodeJS-ex/test.txt",
  content,
  (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Fatto");
    }
  }
);
