import chalk from "chalk";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { getSecrets } from "../utils/esc.js";

const { greenBright, redBright } = chalk;

// Function to generate the configuration
export async function generateConfig(env, proj, format, output) {
  // Fetch ORG from environment variables
  const org = process.env.PULUMI_ORG;
  if (!org) {
    console.error(redBright("ORG environment variable is not set"));
    console.log(
      chalk.gray("Please set the ORG environment variable in the .env file.")
    );
    process.exit(1);
  }
  console.log(greenBright(`Using ORG: ${org}`));

  try {
    const secrets = await getSecrets(org, proj, env);
    console.log(greenBright("⚡️ Secrets fetched successfully!"));

    // Create output directory if it doesn't exist
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, { recursive: true });
    }

    // Format secrets according to the specified format
    let filename;
    let content;

    switch (format.toLowerCase()) {
      case "env":
      case ".env":
        filename = path.join(output, `.env.${env}`);
        content = Object.entries(secrets)
          .map(([key, value]) => `${key}=${value}`)
          .join("\n");
        break;

      case "yaml":
      case "yml":
        filename = path.join(output, `${proj}-${env}.yaml`);
        content = yaml.dump(secrets);
        break;

      case "json":
      default:
        filename = path.join(output, `${proj}-${env}.json`);
        content = JSON.stringify(secrets, null, 2);
        break;
    }

    // Write the file
    fs.writeFileSync(filename, content);
    console.log(greenBright(`⚡️ Configuration saved to: ${filename}`));

    return { success: true, filename };
  } catch (error) {
    console.error(redBright(`Error fetching secrets: ${error.message}`));
    process.exit(1);
  }
}
