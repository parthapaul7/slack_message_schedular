exports.formatBlocks = (blocks) => {
  let formattedBlocks = {};
  
  Object.keys(blocks).forEach((key) => {
    let temp = Object.keys(blocks[key]);
    formattedBlocks[temp] = blocks[key][temp];
  });

  Object.keys(formattedBlocks).forEach((key) => {
    let temp = Object.keys(formattedBlocks[key])[1];
    formattedBlocks[key].value = formattedBlocks[key][temp]; 
  });


//   console.log("res",response,"formattedBlocks", formattedBlocks);
  return formattedBlocks;
};
