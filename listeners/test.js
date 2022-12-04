const { WebClient, LogLevel } = require('@slack/web-api')
    // An access token (from your Slack app or custom integration - xoxp, xoxb)
const userToken = process.env.USER_TOKEN
const botToken = process.env.BOT_TOKEN
const client = new WebClient(userToken, {
        logLevel: LogLevel.DEBUG,
    })
    // testing bull
const { Queue } = require('bullmq')
const { Worker } = require('bullmq')
const myQueue = new Queue('my-queue')
const worker = new Worker('my-queue', async(job) => {
    console.log(job.data)
})
exports.test = async(app) => {
    console.log('test is running')
    myQueue.add('test', { foo: 'bar' }, { delay: 1000 })
    await worker.on('completed', (job) => {
        console.log('job completed')
    })
}