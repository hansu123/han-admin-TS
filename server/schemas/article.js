const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let articleSchema = new mySchema({
  author: String,
  title: String,
  summary: String,
  cate: String,
  content: String,
  cover_img: String,
  n_look: Number,
  n_like: Number,
  n_comment: Number,
  postTime: {
    type:Number,
    default:Date.now()
  }
});
module.exports=articleSchema