const express = require("express")
const router = express.Router()

const featureModel = require("../models/feature")
const logModel = require("../models/log")

// featureModel.create([
//   {
//     level: 1,
//     describe: "新增plan页面",
//     title: "新增plan页面",
//     creator: "项目经理",
//     deadline: "2019-10-02",
//     name: "hansu",
//     done: false
//   },
//   {
//     level: 1,
//     describe: "添加路由可编辑页面",
//     title: "添加路由可编辑页面",
//     creator: "项目经理",
//     deadline: "2019-09-22",
//     name: "hansu",
//     done: true
//   },
//   {
//     level: 1,
//     describe: "登录添加滑动验证",
//     title: "登录添加滑动验证",
//     creator: "项目经理",
//     deadline: "2019-09-22",
//     name: "hansu",
//     done: true
//   },
//   {
//     level: 2,
//     describe: "登录添加通知框提示",
//     title: "登录添加通知框提示",
//     creator: "项目经理",
//     deadline: "2019-09-22",
//     name: "hansu",
//     done: true
//   },
//   {
//     level: 1,
//     describe: "添加接口可视化页面",
//     title: "添加接口可视化页面",
//     creator: "项目经理",
//     deadline: "2019-09-22",
//     name: "hansu",
//     done: true
//   }
// ])


router.get("/featureList", (req, res) => {
  let params,query=req.query
  if(query.deadline){
    let {deadline,...data}=query
    params={deadline:{$lt:deadline},...data}
  }
  else{
    params=JSON.parse(JSON.stringify(query))
  }

  featureModel.count(params).then(total=>{
    featureModel.find(params).then(doc => {
      res.send({
        list: doc,
        total
      })
    })
  })
})

router.post("/featureEdit", (req, res) => {
  let { _id, done } = req.body
  featureModel.findByIdAndUpdate(_id, { done }, { new: true }).then(doc => {
    if (doc) {
      if (doc.done) {
        let newLog = new logModel({
          title: doc.title,
          cate:doc.cate,
          createAt:Date.now(),
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

router.post("/featureAdd", (req, res) => {
  let data = req.body,newfeature = new featureModel(data)
  newfeature.save().then(doc => {
    console.log(doc)
    res.send({
      code: 0
    })
  })
})


module.exports = router