const express = require("express");
const IP = require("ip");
const { timers, globalTimerClearer } = require("./src/services/common/helpers/index");
const fs = require("fs");
const path = require("path");
const decache = require("decache");

const app = express();

require("./src/services/service1/server.js");
require("./src/services/service2/server.js");


app.use("/auth", async (req, res) => {
  const ipAddress = IP.address();
  console.log(
    "IP address :::::::::::::::",
    ipAddress,
    typeof ipAddress,
    req.ip
  );
  // [ '::ffff:172', '30', '10', '162' ]
  // RemoteAddress == ::1 checks if its localhost
  const validAccess = ipAddress.split(".");
  console.log(validAccess);
  console.log(validAccess[1]);

  console.log(req.socket.remoteAddress);
  if (
    req.socket.remoteAddress === "::1" ||
    req.ip === "::ffff:127.0.0.1" ||
    req.ip === "127.0.0.1"
  ) {
    res.json({
      msg: "Valid IP",
    });
  } else {
    res.json({
      msg: "Invalid IP",
    });
  }
});

app.get("/reset", async (req, res) => {
  let files = getAllJSFiles(
    "/home/anayak/Desktop/node-projects/learning/allinOne/src/services/service1"
  );

  function getAllJSFiles(dirPath, arrayOfFiles) {
    let files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllJSFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        if (path.extname(file) === ".js") {
          arrayOfFiles.push(path.join(dirPath, "/", file));
        }
      }
    });
    console.log(arrayOfFiles);
    return arrayOfFiles;
  }

  const intervalIds = [];

  for (let i = 0; i < files.length; i++) {
    var finalArr = [];
    fs.readFile(files[i], "utf8", function (err, contents) {
      if (err) throw err;
      const regex = /setInterval\s*\(/g;
      let match;
      while ((match = regex.exec(contents))) {
        const line = contents.substring(0, match.index).split("\n").length;
        console.log(files[i], ":::::::::::::::", line);
        const intervalId = setInterval(function () {   
        }, 1000);
        clearInterval(intervalId)
        console.log(intervalId);
        finalArr.push(intervalId);
      }
    });
    decache(files[i]);
    require(files[i]);
  }
  console.log("Outside", intervalIds);
  res.json({
    serviceName: "service1",
  });
});

app.get("/details", (req, res) => {
  const origin = req.get("host");
  console.log(req.headers.origin);
  console.log(req.socket.remoteAddress);
  // const origin =
  //   req.headers.origin || req.get("origin") || req.header("Origin");
  const {
    path,
    url,
    method,
    ip,
    fresh,
    originalUrl,
    params,
    protocol,
    query,
    req_res,
    secure,
    signedCookies,
    stale,
    subdomains,
    xhr,
  } = req;
  res.json({
    origin,
    path,
    url,
    method,
    ip,
    fresh,
    originalUrl,
    params,
    protocol,
    query,
    req_res,
    secure,
    signedCookies,
    stale,
    subdomains,
    xhr,
  });
});

app.get('/service_reload/:servicename', (req, res) => {
  const servicename = req.params['servicename']
  const intervalCount = timers.get(servicename).intervals.length
  const timeoutCount = timers.get(servicename).timeouts.length
  if(timers.get(servicename).intervals.length > 0){
    globalTimerClearer(timers.get(servicename).intervals, 'interval')
  }
  if(timers.get(servicename).timeouts.length > 0){
    globalTimerClearer(timers.get(servicename).timeouts, 'timeout')
  }
  
  res.json({
    success: true,
    msg: `Interval cleared for ${servicename}`,
    data : {
      intervalCount : intervalCount,
      timeoutCount : timeoutCount
    }
  })
})
























app.listen(6060, () => {
  console.log(
    ":::::::::::::::::::::: App listening on 6060 :::::::::::::::::::::::::"
  );
});

// setInterval(() => {
//   console.log('Iam running every 15 seconds from serverJs file', Math.floor(Math.random() * 100));
//   console.log(intervals)
// }, 15000)

// let timerFUnction = (sName) => {
//   let id = setInterval(() => {
//     console.log('Iam running every 15 seconds from serverJs file', Math.floor(Math.random() * 100));
//     console.log(intervals)
//   }, 15000);
//   console.log(`${sName} created setInterval with id ${id}`);
// }
