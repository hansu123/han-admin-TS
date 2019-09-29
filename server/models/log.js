const mongoose=require("mongoose")
const logSchema=require("../schemas/log")
const logModel=mongoose.model("log",logSchema,"log")
module.exports=logModel