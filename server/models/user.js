const mongoose = require("mongoose")
const userSchema=require("../schemas/user")

let userModel = mongoose.model("users", userSchema,"users");
module.exports=userModel