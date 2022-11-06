const { readFileSync } = require("fs");

const { blocks } = JSON.parse(readFileSync("./views/step1.json"));

exports.listenShortcut = async (app) => {
  return app.shortcut("send_msg", async ({ ack, payload, client }) => {
    // Acknowledge shortcut request
    console.log(payload);
    ack();
    try {
      // Call the views.open method using the WebClient passed to listeners
      const result = await client.views.open({
        trigger_id: payload.trigger_id,
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
          notify_on_close: true,
          blocks: JSON.stringify(blocks),
          submit: {
            type: "plain_text",
            text: "Next",
          },
          callback_id: "send_msg2",
        },
      });

      return result
    } catch (error) {
      console.error(error);
      return error
    }
  });
};
