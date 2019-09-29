const express = require("express")
const router = express.Router()

const RouteModel = require("../models/route")

// const route = [{
//   F_ID: 1,
//   F_ParentId: 0,
//   route: "index",
//   routeName: "index"
// }, {
//   F_ID: 2,
//   F_ParentId: 1,
//   route: "home",
//   routeName: "home"
// }, {
//   F_ID: 3,
//   F_ParentId: 1,
//   route: "article",
//   routeName: "article"
// },
// {
//   F_ID: 4,
//   F_ParentId: 3,
//   route: "articleList",
//   routeName: "articleList"
// },
// {
//   F_ID: 5,
//   F_ParentId: 3,
//   route: "addArticle",
//   routeName: "addArticle"
// },
// {
//   F_ID: 6,
//   F_ParentId: 1,
//   route: "user",
//   routeName: "user"
// },
// {
//   F_ID: 7,
//   F_ParentId: 1,
//   route: "organize",
//   routeName: "organize"
// },
// {
//   F_ID: 8,
//   F_ParentId: 1,
//   route: "chart",
//   routeName: "chart"
// },
// {
//   F_ID: 9,
//   F_ParentId: 8,
//   route: "barChart",
//   routeName: "barChart"
// },
// {
//   F_ID: 10,
//   F_ParentId: 8,
//   route: "lineChart",
//   routeName: "lineChart"
// },
// {
//   F_ID: 11,
//   F_ParentId: 1,
//   route: "plan",
//   routeName: "plan"
// },
// {
//   F_ID: 12,
//   F_ParentId: 11,
//   route: "bug",
//   routeName: "bug"
// },
// {
//   F_ID: 13,
//   F_ParentId: 11,
//   route: "feature",
//   routeName: "feature"
// },
// {
//   F_ID: 14,
//   F_ParentId: 1,
//   route: "log",
//   routeName: "log"
// }]

// RouteModel.create({route,identity:"manager"})

router.get("/routeList", (req, res) => {
  let { identity } = req.query
  RouteModel.find({ identity }).then((result) => {
    res.send(result[0].route)
  }).catch((err) => {
    global.logger.error(err)
  })
})

module.exports = router