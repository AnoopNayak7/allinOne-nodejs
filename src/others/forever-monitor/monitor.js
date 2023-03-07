var forever = require("forever-monitor");

const fileName = require('../../../server')
var child = new forever.Monitor(fileName, {
  max: 3,
  silent: true,
  args: [],
});

child.on("exit", function () {
  console.log("your-filename.js has exited after 3 restarts");
});

child.start();
