const mongoose =require("mongoose")

const RouteSchema=require("../schemas/route")

const RouteModel=mongoose.model("routes",RouteSchema,"routes")

module.exports=RouteModel