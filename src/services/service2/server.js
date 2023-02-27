const express = require("express");
const amqp = require("amqplib");
var connection, channel;

const app = express();

const { timers } = require("../common/helpers/index");

const connectAMQP = async () => {
  connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("SERVICE_2_CHANNEL");
};
connectAMQP().then(() => {
  channel.consume(
    "SERVICE_2_CHANNEL",
    (data) => {
      console.log(JSON.parse(data.content));
    },
    { noAck: true }
  );
});

timers.get("service2").intervals.push(
  setInterval(() => {
    console.log("Server   @ 2 :::: 12 :::: SetIntervals", Math.floor(Math.random()*100));
  }, 2000)
);

timers.get("service2").timeouts.push(
  setTimeout(() => {
    console.log("Server   @ 2 :::: 12 :::: SetTimeout --------------------------->", Math.random()* 10);
  }, 2000)
);

app.listen(6062, () => {
  console.log("Service 2 is running on port ::" + 6062);
});
