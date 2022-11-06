const { readFileSync } = require("fs");

const { blocks } = JSON.parse(readFileSync("./views/success.json"));
const {formatBlocks} = require("../utils/handleData");
const {scheduleMsg} = require("../controllers/scheduleMsg");
const {storeBlocks,removeBlocks} = require("../database/dataHandler");
const {getCounts} = require("../database/dataHandler");

module.exports = async (app) => {
  
  /// resuming service if server stopped in between
  if(getCounts().isRunning){
    const data = JSON.parse(readFileSync("./database/data.json"));
    try{
      await scheduleMsg(data)
    }
    catch(error){
      console.log(error)
    }
  }


  return app.view("send_msg3", async ({ ack, body, view, client }) => {

    // console.log("view", view.state.values);
    const blockData = formatBlocks(view.state.values);
    const data = {...storeBlocks(blockData)};

    const response = await scheduleMsg(data);
    removeBlocks();

    if(response.msg_send){
      blocks[0].text.text = `messege send to ${response.msg_send}`;
    }
    else{
      blocks[0].text.text = `messege not send to ${response.msg_notSend}`;
    }

    await ack();
    try {
      const result = await client.views.open({
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "My App",
          },
          close: {
            type: "plain_text",
            text: "Close",
          },
          blocks: JSON.stringify(blocks),
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  });
};
