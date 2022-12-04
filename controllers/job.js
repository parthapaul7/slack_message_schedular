const { Worker, QueueEvents } = require('bullmq');
const { updateToDB } = require('../database/dataHandler');
const { sendMsg } = require('../utils/sendMsg');

const events = new QueueEvents('sendMsg');

new Worker('sendMsg', async (job) => {
  // console.log('Processing job', job.id, job.data);
  const { ids, msg, time } = job.data;
  const res = await sendMsg(ids, msg, time);
  return {
    ...res,
    dbId: job.data.dbId,
    ids: job.data.ids,
  }
});

/// event handeling
events.on("completed", async (result) => {
  console.log("job completed", result);
  await updateToDB(result.returnvalue.dbId, { successUsers: result.returnvalue.ids })
  return {
    msg_send: result.jobId,
    msg_notSend: 0,
  };
});

