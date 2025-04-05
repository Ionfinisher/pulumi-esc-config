import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { parseConfigVars } from "./utils/config.js";

const { greenBright } = chalk;

// Main function to run the application
export function main() {
  // Display header
  clear();
  console.log(
    greenBright(
      figlet.textSync("pulumi-esc-config", {
        horizontalLayout: "full",
        verticalLayout: "full",
        font: "Slant",
        width: 80,
        whitespaceBreak: true,
      })
    )
  );

  // Get configuration variables
  const configVars = parseConfigVars();
  console.log("Configuration variables:", configVars);
}

main();
