var figlet = require("figlet");

figlet.fonts(function (err, fonts) {
  if (err) {
    console.log("something went wrong...");
    console.dir(err);
    return;
  }

  for (i = 0; i < fonts.length; i++) {
    figlet.text(
      fonts[i],
      {
        font: fonts[i],
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      },
      function (err, data) {
        if (err) {
          console.log("Something went wrong...");
          console.dir(err);
          return;
        }
        console.log(data);
      }
    );
  }
});