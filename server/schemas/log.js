const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let logSchema = new mySchema({
  cate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  createAt: {
    type: Number,
    required: true
  }
});
module.exports = logSchema