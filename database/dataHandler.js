const {readFileSync,writeFileSync, write} =  require('fs')

let storedBlock= JSON.parse(readFileSync("./database/data.json"));

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

const setCounts = {
    isRunning : false,
    msg_send:0,
    total_msg:0, 
} 

exports.storeCounts = (count,total) => {
    setCounts.isRunning = false 
    if(count<total){
        setCounts.isRunning = true
    }
    
    setCounts.msg_send = count
    setCounts.total_msg = total

   writeFileSync("./database/dataCount.json",JSON.stringify(setCounts,null,2))

   return setCounts 
}

exports.getCounts = () => {
    const data = JSON.parse(readFileSync("./database/dataCount.json"));
    return data 
}



