import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import path from "path";

const { greenBright } = chalk;

clear();
console.log(
  greenBright(
    figlet.textSync("pulumi-esc-config", {
      font: "Script",
      horizontalLayout: "full",
    })
  )
);
