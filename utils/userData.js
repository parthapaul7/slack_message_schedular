const { WebClient, LogLevel } = require("@slack/web-api");

const app = new WebClient(process.env.USER_TOKEN, {});

let profileInfo, profileTimezone;
(async () => {
  try{
    profileInfo = await app.auth.test();
    profileTimezone = await app.users.info({ user: profileInfo?.user_id });
  }catch(err){
    console.log(err)
  }
})();

async function getUserInfo(userId) {
  try {
    userInfo = await app.users.info({ user: userId });
    return userInfo;
    
  } catch (error) {
    return null
  }
}

exports.timezoneDiff = async (userid) => {
  // const res = await client.users.list()
  try {
    const userTimezone = (await getUserInfo(userid)).user.tz_offset;
    profileTz = userTimezone - profileTimezone.user.tz_offset;
    return profileTz;
    
  } catch (error) {
    // console.log(error);
    return 0;
  }


};

exports.getUserName = async (userid) => {
  try {
    const { first_name, last_name } = (await getUserInfo(userid)).user.profile;
    console.log(first_name, last_name);
    return {
      fullName: first_name + " " + last_name,
      firstName: first_name,
      lastName: last_name,
    };
  } catch (error) {
    return{
      fullName: "",
      firstName: "",
      lastName: "",
    }
    
  }

};
