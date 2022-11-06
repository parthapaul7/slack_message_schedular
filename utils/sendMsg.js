const userToken = process.env.USER_TOKEN;
const {refactorMsg} = require('./refactorMsg');

exports.sendMsg = async (client, id, text, time) => {
    refactorText = await refactorMsg(text,id);


  try {
    const result = await client.chat.scheduleMessage({
      token: userToken,
      channel: id,
      text: refactorText,
      post_at: time || Math.ceil(Date.now() / 1000) + 10,
    });
    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
};
