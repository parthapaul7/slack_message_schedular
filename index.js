const { WebClient, LogLevel } = require("@slack/web-api");

const token = "xoxb-4291391505189-4307191503137-f1JaPY8HTvRy2eGJejgqcW0n"
const userToken = "xoxp-4291391505189-4294341488274-4318463471600-e99c6b5447257293c65b261bd0b3352e"
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(token, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG
});
// Find conversation ID using the conversations.list method
async function findConversation(name) {
  try {
    // Call the conversations.list method using the built-in WebClient
    const result = await client.conversations.list({

      // conversations.members  for get the list of members in a channel
      
      // The token you used to initialize your app
      token:token,
      // channel:"C049C73GA5N"
      // types:"im"
    });

    console.log(result);
    // for (const channel of result.channels) {
    //     console.log(channel.name, channel.id);
    //   if (channel.name === name) {
    //     conversationId = channel.id;

    //     // Print result
    //     console.log("Found conversation ID: " + conversationId);
    //     // Break from for loop
    //     break;
    //   }
    // }
  }
  catch (error) {
    console.error(error);
  }
}

// Find conversation with a specified channel `name`
// findConversation("techno");

async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await client.chat.postMessage({
      // The token you used to initialize your app
      token: userToken,
      channel: id,
      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

publishMessage("U048NSG28MQ", "Hello world chalo sab kaam kar raha:tada:");

async function admin(){
  const result = await client.conversations.open({
  token:userToken,
})
console.log(result);
}

// admin();


// list all the users
async function listUsers() {
  try {
  // Call the users.list method using the WebClient
  const result = await client.users.list({
    token: userToken,
  });
  console.log(result);
}
catch (error) {
  console.error(error);
}

}

listUsers();


// users.prifile.get