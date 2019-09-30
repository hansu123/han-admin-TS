const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let featureSchema = new mySchema({
  cate:{
   type:String,
   required:true
  },
  status:{
   type:Number,
   default:0
  },
  description:{
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