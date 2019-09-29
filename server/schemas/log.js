const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let logSchema = new mySchema({
  description:{
    type:String,
    required:true
  },
  title:{
    type: String,
    required:true
  },
  date:{
    type:String,
    required:true
  }
});
module.exports = logSchema