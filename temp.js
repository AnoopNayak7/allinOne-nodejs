setInterval(() => {
  delete require.cache[require.resolve("./temp1")];

  const dat = require("./temp1");

  dat.fun1()
}, 10000);
