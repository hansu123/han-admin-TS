const mongoose=require("mongoose")
let mySchema=require("../schemas/admintor")
let AdminModel = mongoose.model("admintor", mySchema, "admintor");
module.exports=AdminModel