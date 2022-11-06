require("dotenv").config();
const { App } = require("@slack/bolt");

// Initializes your app with your bot token | user token and signing secret

const app = new App({
  token: process.env.USER_TOKEN || process.env.BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const { listenShortcut } = require("./listeners/shortcutHandler");
const handleSubmit = require("./listeners/handleSubmit");
const handleSpep2 = require("./listeners/handleStep2");
const { test } = require("./listeners/test");

// test(app);
/// handling the shortcut
(async () => {
  const promises = [listenShortcut(app), handleSubmit(app), handleSpep2(app)]; 
  try {
    const result = await Promise.all(promises);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();

app.start(process.env.PORT || 3000).then(() => {
  console.log("⚡️ Bolt app is running!");
});
