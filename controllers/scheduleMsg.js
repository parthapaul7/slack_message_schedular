const { WebClient, LogLevel } = require("@slack/web-api");
const { storeCounts } = require("../database/dataHandler");
const { sendMsg } = require("../utils/sendMsg");
const { timezoneDiff } = require("../utils/userData");

const client = new WebClient(process.env.USER_TOKEN, {});

exports.scheduleMsg = async (blockData) => {
  const strTime =
    blockData.timepicker.value != "13:37"
      ? blockData.datepicker.value + " " + blockData.timepicker.value
      : Date.now() + 10000;

  // 10 seconds is added as a buffer time to ensure that the message is sent after the scheduled time
  let time = new Date(strTime).getTime() / 1000;

  let count = 0;
  const allMsg = [];

  // console.log(blockData.timezone);
  const isTzAdjust = blockData.timezone?.value?.value == "true" ? true : false;
  // console.log(blockData.timezone);
  const ids = blockData.conversations.value;

  for (let i = 0; i < ids.length; i++) {

    
    if (isTzAdjust) {
      const tz_offset = await timezoneDiff(ids[i]);
      time = time - tz_offset;
      // console.log(time);
      allMsg.push(
        sendMsg(client, ids[i], blockData.messege.value, Math.ceil(time))
        );
      } else {
        allMsg.push(
          sendMsg(client, ids[i], blockData.messege.value, Math.ceil(time))
          );
        }
        // storeCounts(i+1, ids.length);
  }

  try {
    const result = await Promise.all(allMsg);

    result.forEach((res) => {
      if (res.ok == true) {
        count++;
      }
    });
  } catch (error) {
    console.log(error);
  }
  return {
    msg_send: count,
    msg_notSend: blockData.conversations.value.length - count,
  };
};
