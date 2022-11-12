const { Worker,QueueEvents} = require('bullmq');
const { updateToDB } = require('../database/dataHandler');
const {sendMsg} = require('../utils/sendMsg');

const events = new QueueEvents('sendMsg');

new Worker('sendMsg', async (job) => {
    // console.log('Processing job', job.id, job.data);
    const {  ids, msg, time } = job.data;
    sendMsg( ids, msg, time);
    await updateToDB(job.data.dbId, {successUsers:job.data.ids})
  });

/// event handeling
events.on("completed", (result) => {
  console.log("job completed", result);
    return {
      msg_send:  result.jobId, 
      msg_notSend:  0,
    };
});

