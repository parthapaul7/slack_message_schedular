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
    const payload= {
        message: data.message.value,
        totalUsers: data.conversations.value,
        successUsers: [],
        datePicker: data.datepicker.value,
        timePicker: data.timepicker.value,
        tz: data.timezone?.value?.value || " ",
    }
    const asset = new Asset(payload);
    const res = await asset.save()
    return res._id
}

exports.updateToDB = async (id,data) => {
    const res = await Asset.findByIdAndUpdate(id,data)
    return res
}
