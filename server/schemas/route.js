const mongoose =require("mongoose")

const mySchema=mongoose.Schema;

const RouteSchema=new mySchema({
  identity:String,
  route: Array
})

module.exports=RouteSchema