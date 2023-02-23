const express = require("express");
const IP = require("ip");

const app = express();

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
  if (req.socket.remoteAddress === "::1" || req.ip === "::ffff:127.0.0.1" || req.ip === "127.0.0.1") {
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
  // ----------------------- DELETE SERVICE 1 cache ----------------------------------
  const cachePaths = Object(require.cache)
  delete require.cache[require.resolve("./src/services/service1/")];

  // console.log(cachePaths[])
  // const dddd = delete cachePaths['./src/services/service1/'];
  // const cachePaths = Object(require.cache)
  // console.log(cachePaths)
  // console.log('Cache data was::::::::::::::::')

  console.log('----------------------- DELETE SERVICE 1 cache ---------------------------------')
  
  // -----------------------  Require SERVICE 1 -----------------------------
  require('./src/services/service1/server.js');


  console.log(' -----------------------  Require SERVICE 1 -----------------------------')


  // const Service1 = require('./src/services/service1/server.js')

  res.json({
    serviceName: 'service1',
    // deleteCacheStatus: dddd,
  })
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

app.listen(6060, () => {
  console.log(
    ":::::::::::::::::::::: App listening on 6060 :::::::::::::::::::::::::"
  );
});




