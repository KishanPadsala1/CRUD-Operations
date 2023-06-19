const mongoose = require("mongoose");

const Intro = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("introduction", Intro);
