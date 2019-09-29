const mongoose=require("mongoose")
const bugSchema=require("../schemas/bug")
const bugModel=mongoose.model("bug",bugSchema,"bug")
module.exports=bugModel