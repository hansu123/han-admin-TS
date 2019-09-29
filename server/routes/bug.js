const express = require("express")
const router = express.Router()

const bugModel = require("../models/bug")
const logModel = require("../models/log")

router.get("/bugList", (req, res) => {
  let query=req.query
  console.log(query)
  bugModel.find(query).then(doc => {
    res.send({
      list: doc
    })
  })
})

router.post("/bugEdit", (req, res) => {
  let { _id, done } = req.body
  bugModel.findByIdAndUpdate(_id, { done }, { new: true }).then(doc => {
    if (doc) {
      if (doc.done) {
        let newLog = new logModel({
          title: new Date().toLocaleDateString(),
          date: new Date().toLocaleDateString(),
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