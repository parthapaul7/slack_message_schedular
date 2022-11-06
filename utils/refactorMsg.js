const { getUserName } = require("./userData");

exports.refactorMsg = async (text, userId) => {
    // replace {firstName} with user's first name
    let refactorText;
    console.log("text", text,userId,userId[0]);
    
    if (userId[0] === "U"){
    const { fullName, firstName, lastName } = await getUserName(userId);
    refactorText = text
      .replace(/{fullName}/g, fullName)
      .replace(/{firstName}/g, firstName)
      .replace(/{lastName}/g, lastName);
  } else {
    refactorText = text
      .replace(/{fullName}/g, "")
      .replace(/{firstName}/g, "")
      .replace(/{lastName}/g, "");
  }

  return refactorText;
};
