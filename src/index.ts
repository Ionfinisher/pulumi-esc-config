#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import path from "path";
import * as fs from "fs";
import * as dotenv from "dotenv";
import * as yaml from "js-yaml";
import { Command } from "commander";

const program = new Command();

clear();
console.log(
  chalk.greenBright(figlet.textSync("esc-config", { horizontalLayout: "full" }))
);
