const { WebClient, LogLevel } = require("@slack/web-api");

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const userToken = process.env.USER_TOKEN;
const botToken = process.env.BOT_TOKEN;


// testing bull 

const { Queue, Worker, QueueScheduler } = require('bullmq');

const queue = new Queue('test');

const worker = new Worker('test', async(job) => {
    console.log('Processing job', job.id, job.data);
});

exports.test = async(app) => {
    console.log("test is running");
    queue.add('test', { foo: 'bar' });
    queue.add('test', { foo: 'bar' });
    queue.add('test', { foo: 'bar' });
    queue.add('test', { foo: 'bar' });
};