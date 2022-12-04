const { readFileSync } = require("fs");
const {formatBlocks} = require("../utils/handleData");
const { blocks } = JSON.parse(readFileSync("./views/step2.json"));
const {storeBlocks} = require("../database/dataHandler");

module.exports = async (app) => {

  return app.view("send_msg2", async ({ ack, body, view, client }) => {

    // console.log("view", view.state.values);
    const blockData = formatBlocks(view.state.values);
    storeBlocks(blockData);

    blocks[2].elements[0].text = blockData.message.value;

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
          submit:{
            type: "plain_text",
            text: "Send",
          },
          blocks: JSON.stringify(blocks),
          callback_id: "send_msg3",
        },
      });
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  });
};
