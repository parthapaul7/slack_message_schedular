const { timezoneDiff } = require("../utils/userData");
const { saveToDB } = require('../database/dataHandler');
const { Queue } = require("bullmq");



exports.scheduleMsg = async(blockData) => {
    // doing the jobs
    const queue = new Queue("sendMsg", {
        connection: {
            host: "127.0.0.1",
            port: 6007
        }
    });

    const strTime =
        blockData.timepicker.value != "13:37" ?
        blockData.datepicker.value + " " + blockData.timepicker.value :
        Date.now();

    let time = new Date(strTime).getTime() - Date.now();

    const isTzAdjust = blockData.timezone.value.value == "true" ? true : false;
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


            queue.add("sendMsg", dataTobesend, { delay: time });
        } else {
            queue.add("sendMsg", dataTobesend, { delay: time });
        }
    }

    return ids.length;


};