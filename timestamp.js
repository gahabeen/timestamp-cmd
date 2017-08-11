#!/usr/bin/env node

const program = require("commander"),
  moment = require("moment-timezone"),
  inquirer = require("inquirer"),
  fs = require("fs");

const config = require("./config.json");

program
  .version("0.0.1")
  .option(
    "-l, --lang [lang]",
    "language you want the result to be displayed in"
  )
  .option("-f, --format [format]", "format of the data (from moment-timezone)")
  .option(
    "-dL, --defaultLanguage [defaultLanguage]",
    "set the default language"
  )
  .option("-dL, --defaultFormat [defaultFormat]", "set the default format")
  .parse(process.argv);

let inputTimestamp =
    program.args.length > 0 ? program.args[0].slice(0, 10) : null,
  outputText = null,
  format = program.format || "LLLL";

if (program.defaultLanguage) {
  config.lang = program.defaultLanguage;
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
} else if (program.defaultFormat) {
  config.format = program.defaultFormat;
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
} else {
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
  } else {
    console.error("Something is missing, good luck to find what ;)");
  }
}
