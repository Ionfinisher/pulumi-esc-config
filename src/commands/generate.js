import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import * as pulumi from "@pulumi/pulumi";
// import { getTemplateFiles } from "../templates";
require("dotenv").config();

const { greenBright, red, blue, yellow } = chalk;

async function createRepo(env, format, output, keys) {
  if (!env || !format || !output) {
    console.error(red("Error: Missing required arguments!"));
    console.error(
      yellow(
        "Usage: pulumi-esc-config generate --env <env> --format <format> --output <output>"
      )
    );
    process.exit(1);
  }

  if (!["env", "json", "yaml"].includes(format)) {
    console.error(red("Error: Invalid format!"));
    console.error(yellow("Valid formats are: env, json, yaml"));
    process.exit(1);
  }

  const templateDir = output;
  const outputDir = templateFiles.outputDir;
  const keyList = keys ? keys.split(",") : null;

  try {
    const stackArgs = {
      projectSettings: { name: "esc-config", runtime: "nodejs" },
      stackSettings: {
        [env]: {
          secretsProvider: "default",
        },
      },
    };

    // const workspace = await automation.LocalWorkspace.create(stackArgs);
    // const pulumiStack = await automation.Stack.createOrSelect(env, workspace);

    // const config = await pulumiStack.getAllConfig();
    const config = new pulumi.Config();
    const filteredConfig = keyList
      ? Object.fromEntries(
          Object.entries(config).filter(([key]) => keyList.includes(key))
        )
      : config;

    let outputContent = "";
    if (format === "env") {
      outputContent = Object.entries(filteredConfig)
        .map(([key, value]) => `${key}=${value}`)
        .join("\n");
    } else if (format === "json") {
      outputContent = JSON.stringify(filteredConfig, null, 2);
    } else if (format === "yaml") {
      outputContent = yaml.dump(filteredConfig);
    }

    console.log(greenBright("Generating configuration files..."));
    console.log(blue(`Template Directory: ${templateDir}`));
    console.log(blue(`Output Directory: ${outputDir}`));

    // Here you would typically copy files from the template directory to the output directory
    // For example, using fs-extra or a similar library
  } catch (error) {
    console.error(red("Error generating configuration files:"));
    console.error(error);
    process.exit(1);
  }
}
