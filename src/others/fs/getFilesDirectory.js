const fsp = require("fs/promises");
const fs = require("fs");

// Function that returns files inside directory
const getFiles = async (dirname) => {
  let data = await fsp.readdir(dirname);
  return data;
};

// Recurssive function that takes directory name and sends it to getFile()
const getFilesFromAnywhere = async (dirname) => {
  let allPaths = [];
  let fileArr = await getFiles(dirname);
  allPaths = fileArr;

  for(let i=0; i<fileArr.length; i++){
    const temp = fileArr[i].split(".");
    if (temp.length == 1) {
      const data = await getFiles(`${dirname}/${fileArr[i]}`);
      for(let i =0; i< data.length; i++){
        console.log(data[i])
        allPaths.push(data[i]);
      }
    }
  }
  console.log("jjjj", allPaths);
  return allPaths;
};

// FunctionCall
getFilesFromAnywhere("../../libs")
