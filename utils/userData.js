const { WebClient, LogLevel } = require("@slack/web-api");

const app = new WebClient(process.env.USER_TOKEN, {});

let profileInfo, profileTimezone;
(async () => {
  profileInfo = await app.auth.test();
  profileTimezone = await app.users.info({ user: profileInfo.user_id });
})();

async function getUserInfo(userId) {
  userInfo = await app.users.info({ user: userId });
  return userInfo;
}

exports.timezoneDiff = async (client, userid) => {
  // const res = await client.users.list()
  const userTimezone = await getUserInfo(userid).user.tz_offset;

  profileTz = userTimezone - profileTimezone.user.tz_offset;

  return profileTz;
};

exports.getUserName = async (userid) => {
  const { first_name, last_name } = (await getUserInfo(userid)).user.profile;
  console.log(first_name, last_name);

  return {
    fullName: first_name + " " + last_name,
    firstName: first_name,
    lastName: last_name,
  };
};
