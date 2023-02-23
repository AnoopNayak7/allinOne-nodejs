const express = require("express");
const amqp = require("amqplib");
var connection, channel;

const app = express();

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

app.listen(6062, () => {
  console.log("Service 2 is running on port ::" + 6062);
});
