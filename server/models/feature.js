const mongoose=require("mongoose")
const featureSchema=require("../schemas/feature")
const featureModel=mongoose.model("feature",featureSchema,"feature")
module.exports=featureModel