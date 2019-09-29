const mongoose = require("mongoose");
const mySchema = mongoose.Schema;
let bugSchema = new mySchema({
  cate:{
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
  status:{
    type:Number,
    required:true
  },
  done:{
    type:Boolean,
    default:false
  }
});
module.exports = bugSchema