const express = require("express");
const decache = require("decache");

const app = express();

app.get("/hi", (req, res) => {
  getAllRoutePaths();
  res.json({ msg: "Hellloooooo 555" });
});

app.get("/bye", (req, res) => {
  res.json({ msg: "Bye world" });
});
// console.log(app)
// console.log(app._router.stack);

const getAllRoutePaths = () => {
  if (app._router.stack) {
    for (let i = 0; i < app._router.stack.length; i++) {
      if (app._router.stack[i].name === "bound dispatch") {
        const path = JSON.parse(JSON.stringify(app._router.stack[i]));
        console.log(path)
        require('./app.js')
      }
    }
  }
};

app.listen(4000, () => {
  console.log("app listening on port", 4000);
});
