import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { parseConfigVars } from "./utils/config.js";

const { greenBright, redBright } = chalk;

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

  // Check if the required variables are set
  const requiredVars = ["proj", "env", "format", "output"];
  const missingVars = requiredVars.filter((varName) => !configVars[varName]);
  if (missingVars.length > 0) {
    console.error(
      redBright(
        `Missing required configuration variables: ${missingVars.join(", ")}`
      )
    );
    process.exit(1);
  }
  console.log(
    greenBright(
      `⚡️ All required configuration variables are set: ${requiredVars.join(
        ", "
      )}`
    )
  );
}

main();
