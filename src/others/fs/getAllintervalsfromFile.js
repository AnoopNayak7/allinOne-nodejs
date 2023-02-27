const fs = require("fs");
const path = require("path");

let files = getAllJSFiles(
  "/home/anayak/Desktop/node-projects/learning/allinOne/src/libs"
);

const pkInterval = require("../../libs/pk");

pkInterval.printSomething();

// let checkq = '/home/anayak/Desktop/'

// console.log(checkq.isDirectory())

function getAllJSFiles(dirPath, arrayOfFiles) {
  let files = fs.readdirSync(dirPath);
  // console.log(files)
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      // console.log(dirPath);
      // console.log("DIR PATH :::::", dirPath + "/" + file);
      arrayOfFiles = getAllJSFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (path.extname(file) === ".js") {
        // console.log("BEFORE PUSHING", arrayOfFiles);
        arrayOfFiles.push(path.join(dirPath, "/", file));
        // console.log("AFTER PUSHING", arrayOfFiles);
      }
    }
  });
  console.log(arrayOfFiles);
  return arrayOfFiles;
}

const intervalIds = [];

files.forEach(function (file) {
  fs.readFile(file, "utf8", function (err, contents) {
    if (err) throw err;

    // /setInterval\s*\(/g
    const regex = /setInterval\s*\(/g;
    let match;
    while ((match = regex.exec(contents))) {
      // const line = contents.substring(0, match.index).split("\n").length;
      // console.log(`Filename :::: ${file} at line :::: ${line}`);

      const intervalId = setInterval(function () {
        // console.log(`Filename :::: ${file} at line :::: ${line}`);
      }, 1000);

      intervalIds.push(intervalId);
    }
  });
});

console.log("Thesse are my interval ids ::::",intervalIds)

setTimeout(function () {
  intervalIds.forEach(function (intervalId) {
    clearInterval(intervalId);
    console.log(`Interval ${intervalId} cleared successfully`);
  });
}, 4000);
