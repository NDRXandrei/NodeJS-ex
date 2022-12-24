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

const players = ["Tina", "Jorge", "Julien"];

players.forEach((player) => {
  const getResults = async () => {
    try {
      const promise = await luckyDraw(player);
      console.log(promise);
    } catch (err) {
      console.log(err.message.toString());
    }
  };
  getResults();
});
