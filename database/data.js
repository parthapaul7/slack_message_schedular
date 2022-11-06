let storedBlock= {};

exports.storeBlocks = (blocks) => {
    storedBlock = {...storedBlock,...blocks}
   return storedBlock 
}

exports.removeBlocks= (blocks) => {
    storedBlocks ={}
    return true
}