const express=require("express")
const router=express.Router()

const logModel=require("../models/log")

// logModel.create([
//   {date:"2019-9-1",title:"2019-9-1",description:"TS版后台上线"},
//   {date:"2018-1-1",title:"2018-1-1",description:"JS版后台上线"}
// ]
// )

router.get("/logList",(req,res)=>{
  logModel.find({}).then(doc=>{
    res.send({
       list:doc
    })
  })
})

module.exports=router