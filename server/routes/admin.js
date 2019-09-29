const express = require("express");
const router = express.Router();

const AdminModel = require("../models/admintor")
//token
const jwt = require("jsonwebtoken")
const passport = require("passport")



router.post("/regist", (req, res) => {
    let { name, password, identity } = req.body;
    AdminModel.findOne({ name }).then(doc => {
        if (doc) { res.send({ code: -1, message: "用户名已存在" }) }
        else {
            let newDoc=new AdminModel({
                name, password, identity
            })
            newDoc.save().then(()=>{
                res.send({ code: 0 });
            })
        }
    });
})


router.post("/login", (req, res) => {
    console.log(req.body)
    let { name,password} = req.body;
    AdminModel.findOne({ name }).then(doc => {
        if (doc) {
            if(doc.comparePwd(password)){
                const secret = 'secret'
                //生成token并返回token(令牌)
                const rule = { name, password, identity:doc.identity };
                let token = jwt.sign(rule, secret, { expiresIn: 3600 }); //过期时间
                res.send({ code: 0, token: "Bearer " + token });
            }
            else { res.send({ code: 1, message: "内部错误" }); }
        }
        else {
            res.send({ code: 1, message: "用户已存在" });
        }
    });
});

require("../config/passport")(passport);

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {

    res.send({ message: "ok" })

})





module.exports = router;




