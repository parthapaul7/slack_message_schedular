const Asset = require('../database/model');
const {readFileSync,writeFileSync} = require('fs');
let storedBlock = JSON.parse(readFileSync("./database/data.json")); 

exports.storeBlocks = (blocks) => {

    storedBlock = {...storedBlock,...blocks}
    writeFileSync("./database/data.json",JSON.stringify(storedBlock,null,2))

   return storedBlock 
}


exports.removeBlocks= () => {
    storedBlock ={}
    writeFileSync("./database/data.json",JSON.stringify(storedBlock,null,2))
    return true
}



exports.saveToDB =  async (data) => {
    const strTime =
    data.timepicker.value != "13:37"
      ? data.datepicker.value + " " + data.timepicker.value
      : Date.now();

    const payload= {
        message: data.message.value,
        totalUsers: data.conversations.value,
        successUsers: [],
        timeToSend: (new Date(strTime)).toISOString(),
        tz: data.timezone?.value?.value || " ",
    }
    const asset = new Asset(payload);
    const res = await asset.save()
    return res._id
}

exports.updateToDB = async (id,data) => {
    const {successUsers} = data;
    const time = new Date().toISOString();

    const payload = {
        user: successUsers,
        time: time
    }
    try{

        const res = await Asset.findByIdAndUpdate(id,{successUsers: payload},{new:true})
        return res
    }catch(err){
        console.log(err)
        return new Error(err)
    }

}
