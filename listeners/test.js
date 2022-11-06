const { WebClient ,LogLevel} = require("@slack/web-api");

// An access token (from your Slack app or custom integration - xoxp, xoxb)
const userToken = process.env.USER_TOKEN;
const botToken = process.env.BOT_TOKEN;

const client = new WebClient(userToken, {
  logLevel: LogLevel.DEBUG,
});

const { timezoneDiff } = require("../utils/userData");

exports.test = async (app) => {
  return await timezoneDiff(client,"U049MCQTJTW" );
};
