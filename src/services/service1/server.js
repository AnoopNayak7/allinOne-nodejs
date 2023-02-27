const express = require("express");
const amqp = require("amqplib");

const { timers } = require("../common/helpers/index");

// timers["service1"].intervals = {
//   id: setInterval(() => {
//     console.log("Server @ 1 :::: 11 :::: SetIntervals");
//   }, 2000),
// };



timers.get("service1").intervals.push(
  setInterval(() => {
    console.log("Server   @ 1 :::: 11 :::: SetIntervals", Math.random()*100);
  }, 2000)
);

timers.get("service1").intervals.push(
  setInterval(() => {
    console.log("Server   @ 1 :::: 12 :::: SetIntervals", Math.random()*100);
  }, 2000)
);

timers.get("service1").intervals.push(
  setInterval(() => {
    console.log("Server   @ 1 :::: 13 :::: SetIntervals", Math.random()*100);
  }, 2000)
);

timers.get("service1").timeouts.push(
  setTimeout(() => {
    console.log("Server   @ 1 :::: 100 :::: SetTimeout", Math.random()*100);
  }, 2000)
);

timers.get("service1").timeouts.push(
  setTimeout(() => {
    console.log("Server   @ 1 :::: 101 :::: SetTimeout", Math.random()*100);
  }, 2000)
);


// timers["service1"].intervals = {
//   id: setInterval(() => {
//     console.log("Server @ 1 :::: 11 :::: SetIntervals");
//   }, 2000),
// };

// timers.push({
//   service_name: "service1",
//   type: 'interval',
//   id: setInterval(() => {
//     console.log("Server @ 1 :::: SetIntervals");
//   }, 2000),
// });

// intervals.push({
//   service_name: "service1",
//   type: 'interval',
//   id: setInterval(() => {
//     console.log("Server @ 1 :::: SetIntervals");
//   }, 3000),
// });

// intervals.push({
//   service_name: "service1",
//   type: 'interval',
//   id: setInterval(() => {
//     console.log("Server @ 1 :::: SetIntervals");
//   }, 4000),
// });

const name = require("./constant");

var connection, channel;

const app = express();

const connectAMQP = async () => {
  console.log(
    "::::::::::::::::::::::::::::::::::::::: RABBIT-MQ  CONNECTION STARTED ::::::::::::::::::::::::::::::::::"
  );
  connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("SERVICE_1_CHANNEL");
  console.log(
    "::::::::::::::::::::::::::::::::::::::: RABBIT-MQ  CONNECTION ENDED ::::::::::::::::::::::::::::::::::"
  );
};
connectAMQP().then(() => {
  channel.sendToQueue(
    "SERVICE_2_CHANNEL",
    Buffer.from(JSON.stringify({ success: true, msg: name }))
  );
});

console.log("ServerName is ", name);
