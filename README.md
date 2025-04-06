# Pulumi ESC Config Generator

The esc-config tool is a command-line interface (CLI) designed to fetch secrets and configurations from Pulumi ESC and generate configuration files in formats like .env, JSON, or YAML. This documentation will guide you through setting up and using the tool effectively.

# Table of Content

- 🧱 [Features](#features)
- 🚀 [Getting Started](#getting-started)
- 📦 [Installation](#installation)
- 🛠 [Best Practices](#best-practices)
- 📃 [License](#license)
- 👤 [Author](#resources)

## Features

- Connects to Pulumi ESC to fetch secrets and configurations for a specified environment.

- Supports generating files in various formats (e.g., .env for Node.js, JSON, YAML) to suit different applications.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- Pulumi ESC CLI to login to your account [Download Instructions here](https://www.pulumi.com/docs/esc/download-install/)

## Installation

### Setup Guide (You can [skip](#4-login-to-pulumi-with-the-esc-cli) 1 to 3 if you already have an account)

### 1. Create a Pulumi Account

1. Sign up for a free account at [Pulumi Console](https://app.pulumi.com/signup)
2. Note your organization name (visible in the URL after login: `app.pulumi.com/<your-organization-name>`)

### 2. Set Up Your ESC Environment

1. Navigate to **ESC** in the left sidebar of the Pulumi Console
2. Click **Create Project** and provide a project name
3. Within your project, create a new environment (e.g., `dev`, `staging`, `prod`)

### 3. Add Secrets to Your Environment

1. Select your environment and click **Add Secret**
2. Enter key-value pairs representing your application configuration
3. Click **Save Changes**

### 4. Login to Pulumi with the ESC CLI

1. Open you terminal
2. Enter `esc login` and follow the follow the instructions

### Getting started

1. Clone the repository:

```bash
git clone https://github.com/Ionfinisher/pulumi-esc-config.git
cd pulumi-esc-config
```

2. Install dependencies:

```bash
npm install
```

3. Copy your organization name and change `<YOUR_PULUMI_ORG>` with it.

4. Change the `.env.example` into `.env`

## Usage

After setting up your environment, you can use the tool with the following commands:

### Basic Command Structure

```bash
npm run generate -- --proj <project-name> --env <environment-name> --type <format-type> --output <output-path>
```

You can also use shorthand parameters:

```bash
npm run generate -- -p <project-name> -e <environment-name> -t <format-type> -o <output-path>
```

Don't panic the `--` before the the parameters tells npm to pass the remaining arguments to our script instead of trying to interpret them itself.

### Examples

- Generate a .env file for development environment:

```bash
npm run generate -- -p myproject -e dev -t env -o .env
```

- Create a JSON configuration file for production:

```bash
npm run generate -- -p myproject -e prod -t json -o config.json
```

- Generate a YAML configuration file for staging:

```bash
npm run generate -- -p myproject -e staging -t yaml -o config
```

### Supported Format Types

- env or .env: Generates a .env file with KEY=VALUE format

- json: Generates a JSON file

- yaml or yml: Generates a YAML file

### Integration with Frameworks

After generating your configuration files, you'll need to use them in your application. Here are examples for popular frameworks and languages:

- Node.js (JavaScript/TypeScript)

For json files:

```js
// Load configuration from JSON file
import fs from "fs";
const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

// Access variables
const apiKey = config.API_KEY;
console.log(`Using API key: ${apiKey}`);
```

- Python
  For .env files using python-dotenv:

```python
# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv('.env.dev')

# Access variables
import os
api_key = os.getenv('API_KEY')
print(f"Using API key: {api_key}")
```

### Notes

- The output path can be a directory or a file

- When specifying a directory, a file will be created with a name based on your project and environment

- All commands require the PULUMI_ORG environment variable to be set in your .env file

## Best Practices

When working with Pulumi ESC for secrets management, follow these best practices:

1. Secret Management
   Rotate Secrets Regularly: Schedule regular rotation of secrets to minimize the impact of potential breaches.

2. Use Least Privilege: Grant only the necessary access permissions to secrets, limiting the scope of potential damage.

3. Avoid Hardcoding: Never hardcode secrets in your application code or commit them to version control.

4. Environment Isolation: Use separate environments (dev, staging, prod) with different secret values for proper isolation.

5. For more information about Pulumi ESC concepts and best practices, refer to the [official documentation](https://www.pulumi.com/docs/pulumi-cloud/esc/concepts/).

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Built by [Teddy ASSIH](https://www.linkedin.com/in/teddy-assih-b4204b254/)
