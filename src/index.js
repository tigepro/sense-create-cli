#!/usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const chalk = require("chalk");
const { program } = require("commander");

const packageFile = require("../package.json");
const { dirMap, getPathByDirlist } = require("./config")

const print = (msg = "", color = "green") => console.log(chalk[color](msg));

program.option(`-s, --${dirMap['s']}`, 'Create file in src directory.')
  .option(`-c, --${dirMap['c']}`, 'Create file in common directory.')
  .option(`-p, --${dirMap['p']}`, 'Create file in page directory.')
  .option(`-u, --${dirMap['u']}`, 'Create file in util directory.')
  .option(`-sr, --${dirMap['sr']}`, 'Create file in util directory.')

//  sense -v | --version
const version = packageFile.version;
program.version(version, "-v, --version", "output the current version");

//  sense create
program
  .command("create [destination]")
  .description("Initialize the react typescript antd template, and the less files it depends on.")
  .action((destination = "index.tsx") => {
    const ops = program.opts();
    const dirList = Object.keys(ops);
    const dirPath = getPathByDirlist(dirList);
    const { style, content } = require("./template/default");
    const cmdRoot = process.cwd();
    const list = destination.split("/");
    const fileName = list.length > 0 ? list[list.length - 1] : "index.tsx";
    const [rawName = "", suffix = "tsx"] = fileName.split(".");
    const lowerRawName = rawName.slice(0, 1).toLowerCase() + rawName.slice(1);
    const outputFile = path.resolve(cmdRoot, dirPath, destination);
    const outputDir = path.dirname(outputFile);

    fs.outputFile( 
      `${outputDir}/${rawName}.${suffix}`,
      content.replace("index.less", `${lowerRawName}.less`),
      (err) => {
        if (err) {
          console.log(err);
        } else {
            print(`Folder: ${outputDir} \nfile ${rawName}.${suffix} created successfully.
            `);
        }
      }
    );
    fs.outputFile(`${outputDir}/${lowerRawName}.less`, style, (err) => {
      if (err) {
        console.log(err);
      } else {
        print(`Folder: ${outputDir} \nNew file ${lowerRawName}.less created successfully.
        `);
      }
    });
  });
  
  program.parse(process.argv);

