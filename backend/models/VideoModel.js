const mongoose = require("mongoose");

const VideoModel = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideoModel", VideoModel);
