const { WebClient ,LogLevel} = require("@slack/web-api");

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const userToken = process.env.USER_TOKEN;
const botToken = process.env.BOT_TOKEN;

const client = new WebClient(userToken, {
  logLevel: LogLevel.DEBUG,
});

// testing bull 

const Queue  = require("bull");
const sendMsg = new Queue("sendMsg",{
  redis:{
    host:"",
    port:"",
    password:"",
  }
});

sendMsg.add("sendIt",{name: "test"}).then((result) => {
  console.log("the result is", result);
}).catch((error) => {
  console.error(error);
});

sendMsg.process((job) => {
  return console.log("the job is", job.data);
});



exports.test = async (app) => {
  console.log("test is running");
   
};
