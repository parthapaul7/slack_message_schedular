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

    successUsers: [
      {
        time: { type: String, required: true },
        user: { type: String, required: true },
      },
    ],
    timeToSend: {
      type: String,
      required: true,
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
