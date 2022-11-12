const { timezoneDiff } = require("../utils/userData");
const {saveToDb, saveToDB, updateToDB} = require('../database/dataHandler');
require("./job");

const { Queue } = require("bullmq");


exports.scheduleMsg = async (blockData) => {
  // doing the jobs
  const queue = new Queue("sendMsg");

  const strTime =
    blockData.timepicker.value != "13:37"
      ? blockData.datepicker.value + " " + blockData.timepicker.value
      : Date.now();

  let time = new Date(strTime).getTime()- Date.now();
  let count = 0;

  const isTzAdjust = blockData.timezone?.value?.value == "true" ? true : false;
  const ids = blockData.conversations.value;

  const dbId = await saveToDB(blockData);

  for (let i = 0; i < ids.length; i++) {
    const dataTobesend = {
      dbId: dbId,
      ids: ids[i],
      msg: blockData.message.value,
      time: Math.ceil(time),
    };

    if (isTzAdjust) {
      const tz_offset = await timezoneDiff(ids[i]);
      time = time - tz_offset;
      dataTobesend.time = Math.ceil(time);


      queue.add("sendMsg", dataTobesend,{delay:time});
    } else {
      queue.add("sendMsg", dataTobesend,{delay:time});
    }
    // storeCounts(i+1, ids.length);
  }

  count = ids.length; 

  return {
    msg_send: count || 0,
    msg_notSend: blockData.conversations.value.length - count || 0,
  } 
};
