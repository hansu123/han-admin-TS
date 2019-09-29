const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let featureSchema = new mySchema({
  level:{
   type:Number,
   required:true
  },
  describe:{
    type:String,
    required:true
  },
  title:{
    type: String,
    required:true
  },
  creator:{
    type:String,
    required:true
  },
  deadline:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  done:{
    type:Boolean,
    default:false
  }
});
module.exports = featureSchema