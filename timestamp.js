#!/usr/bin/env node

const program = require("commander"),
  moment = require("moment-timezone"),
  inquirer = require("inquirer"),
  fs = require("fs"),
  path = require("path");

let configPath = path.join(__dirname, "./config.json");
let defaultConfigPath = path.join(__dirname, "./default.config.json");

const config = require(configPath);

program
  .version("0.0.1")
  .allowUnknownOption()
  .option(
    "-l, --lang [lang]",
    "language you want the result to be displayed in"
  )
  .option("-f, --format [format]", "format of the data (from moment-timezone)")
  .option("-L, --defaultLang [defaultLang]", "set the default language")
  .option("-F, --defaultFormat [defaultFormat]", "set the default format")
  .option("-R, --resetConfig [reset]", "reset to default configuration")
  .parse(process.argv);

let inputTimestamp =
    program.args.length > 0 ? program.args[0].slice(0, 10) : null,
  outputText = null,
  format = typeof program.format === "string" ? program.format : null;

if (program.defaultLang) {
  config.lang = program.defaultLang;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`default lang: ${config.lang}`);
}

if (program.defaultFormat) {
  config.format = program.defaultFormat;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`default format: ${config.format}`);
}

if (program.resetConfig === true) {
  let defaultConfig = require(defaultConfigPath);
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log(`config reset: done!`);
}

if (typeof program.lang === "string") {
  moment.locale(program.lang);
} else {
  moment.locale(config.lang);
}

if (inputTimestamp) {
  if (format) {
    try {
      outputText = moment.unix(inputTimestamp).format(format);
    } catch (error) {
      console.error(
        `The format ${format} doesn't exists.\nComplete errror:\n${error}`
      );
    }
  } else {
    try {
      outputText = moment.unix(inputTimestamp).format(config.format);
    } catch (error) {
      console.error(
        `The default format ${format} doesn't exists.\nComplete errror:\n${error}`
      );
      try {
        outputText = moment.unix(inputTimestamp).format("LLLL");
      } catch (error) {
        console.error(
          `The timestamp ${inputTimestamp} isn't valid.\nComplete errror:\n${error}`
        );
      }
    }
  }
}

if (outputText) {
  console.log(outputText);
} else if (inputTimestamp) {
  console.error("Something is missing, did you provide a timestamp?");
}
