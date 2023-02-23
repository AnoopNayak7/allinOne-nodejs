const express = require("express");
const amqp = require("amqplib");


const name = require("./constant");

var connection, channel;

const app = express();

const connectAMQP = async () => {
  console.log('::::::::::::::::::::::::::::::::::::::: RABBIT-MQ  CONNECTION STARTED ::::::::::::::::::::::::::::::::::')
  connection = await amqp.connect("amqp://localhost:5672");
  channel = await connection.createChannel();
  await channel.assertQueue("SERVICE_1_CHANNEL");
  console.log('::::::::::::::::::::::::::::::::::::::: RABBIT-MQ  CONNECTION ENDED ::::::::::::::::::::::::::::::::::')
};
connectAMQP().then(() => {
  channel.sendToQueue(
    "SERVICE_2_CHANNEL",
    Buffer.from(JSON.stringify({ success: true, msg: name }))
  );
});

console.log("ServerName is ::::::::::::: ", name);
