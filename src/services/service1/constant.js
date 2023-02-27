const { timers } = require("../common/helpers/index");

timers.get("service1").intervals.push(
  setInterval(() => {
    console.log("Constant @ 1 :::: 11 :::: SetIntervals");
  }, 2000)
);

module.exports = {
  servername: "Hanuman",
};
