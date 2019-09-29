const server = require("express")
const router = server.Router();
const userModel=require("../models/user")
//引入passport验证
const passport = require("passport");
require("../config/passport")(passport);

router.get("/userList", passport.authenticate("jwt", { session: false }), (req, res) => {
  userModel.count({}).then(total=>{
    userModel.find({}).then(doc=> {
      console.log(doc)
      res.send({
        list:doc,
        total
      })
    })
  })
})

router.post("/userAdd", passport.authenticate("jwt", { session: false }), (req, res) => {
  let data=req.body
  let user=new userModel(data)
  user.save().then(doc=>{
    console.log(doc)
    res.send({
      code:0
    })
  })
})

module.exports = router;