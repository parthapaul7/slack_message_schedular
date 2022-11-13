const userToken = process.env.USER_TOKEN;
const {refactorMsg} = require('./refactorMsg');
const { WebClient } = require("@slack/web-api");

const client = new WebClient(userToken, {});


exports.sendMsg = async (id, text, time) => {
    refactorText = await refactorMsg(text,id);


  try {
    const result = await client.chat.postMessage({
      token: userToken,
      channel: id,
      text: refactorText,
    });
    return result;
  } catch (error) {
    console.error(error);
    return new Error(error);
  }
};
