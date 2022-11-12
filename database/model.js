const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
    totalUsers: {
      type: Array,
      required: true,
    },
    successUsers: {
        type: Array,
        required: true,
    },
    datePicker: {
      type: String,
    },
    timePicker: {
      type: String,
    },
    tz: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Asset", assetSchema);