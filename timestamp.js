#!/usr/bin/env node

const program = require("commander"),
  moment = require("moment-timezone"),
  inquirer = require("inquirer"),
  fs = require("fs");

const config = require("./config.json");

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
  format = program.format || "LLLL";

if (program.defaultLang) {
  config.lang = program.defaultLang;
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
  console.log(`default lang: ${config.lang}`);
}

if (program.defaultFormat) {
  config.format = program.defaultFormat;
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
  console.log(`default format: ${config.format}`);
}

if (program.reset === true) {
  let defaultConfig = require("./default.config.json");
  fs.writeFileSync("./config.json", JSON.stringify(defaultConfig, null, 2));
  console.log(`config reset: done!`);
}

if (typeof program.lang === "string") {
  moment.locale(program.lang);
} else {
  moment.locale(config.lang);
}

if (inputTimestamp) {
  try {
    outputText = moment.unix(inputTimestamp).format(format);
  } catch (error) {
    console.error(
      `The format ${format} doesn't exists.\nComplete errror:\n${error}`
    );
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
  console.error("Something is missing, good luck to find what ;)");
}
