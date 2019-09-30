const express = require("express")
const router = express.Router()

const bugModel = require("../models/bug")
const logModel = require("../models/log")

router.get("/bugList", (req, res) => {
  let params,query=req.query
  if(query.deadline){
     let {deadline,...data}=query
     params={
       deadline:{$lt:deadline},
       ...data
     }
  }
  else{
    params=JSON.parse(JSON.stringify(query))
  }
  console.log(params)
  bugModel.count(params).then(total=>{
    bugModel.find(params).then(doc => {
      res.send({
        list: doc,
        total
      })
    })
  })

})

router.post("/bugEdit", (req, res) => {
  let { _id, done } = req.body
  bugModel.findByIdAndUpdate(_id, { done }, { new: true }).then(doc => {
    if (doc) {
      if (doc.done) {
        let newLog = new logModel({
          title: doc.title,
          cate:'bug',
          createAt: Date.now(),
          description: doc.title
        })
        newLog.save()
      }
      res.send({
        code: 0
      })
    }
  })
})

router.post("/bugAdd", (req, res) => {
  let data = req.body
  let newBug = new bugModel(data)
  newBug.save().then(doc => {
    console.log(doc)
    res.send({
      code: 0
    })
  })
})


module.exports = router