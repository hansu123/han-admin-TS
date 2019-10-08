const express = require("express");
const router = express.Router();

const articleModel = require("../models/article")

const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "static/upload/article" });

const {cmder,rmDirFiles}=require("../utils/cmd")

//腾讯cos
const myCos = require("../utils/cos")

//引入passport验证
const passport = require("passport");
require("../config/passport")(passport);

router.get("/articleList", passport.authenticate("jwt", { session: false }), (req, res) => {

    let params = req.query, query;
    console.log(params)
    let { pagesize, currentPage, startTime, endTime, ...data } = params
    if (startTime || endTime) {
        if (startTime && !endTime) {
            query = {
                ...data,
                postTime: { $gt: startTime }
            }
        }
        else if (!startTime && endTime) {
            query = {
                ...data,
                postTime: { $lt: endTime }
            }
        }
        else {
            query = {
                ...data,
                postTime: { $lt: endTime, $gt: startTime }
            }
        }
    }
    else {
        query = data
    }
    console.log(query)
    articleModel.count(query).then(total => {
        articleModel.find(query).skip((currentPage - 1) * pagesize).limit(+pagesize).then(result => {
            console.log(total)
            res.send({
                list: result,
                total
            })
        });
    })
});


router.post("/articleDelete", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { id } = req.body;
    articleModel.findByIdAndRemove(id).then(result => {
        if (result) {
            res.send({ code: 0 })
        }
        else {
            global.logger.info("删除文章失败")
        }
    });
});

router.post("/articleAdd", passport.authenticate("jwt", { session: false }), upload.single('file'), (req, res) => {
    
    let { title, cate, summary, content } = req.body
    //图片设置
    let { originalname, filename, path } = req.file

    let i = originalname.lastIndexOf(".")

    filename = Date.now() + Math.ceil(Math.random() * 100) + originalname.substr(i - 1);

    let filePath = "static/upload/article/"

    fs.renameSync(path, filePath + filename, (err) => {
        if (err); throw err;
    })

    let query = {
        Key: "/han-admin-TS/img/blog/" + filename,
        Body: fs.createReadStream(filePath + filename)
    }

    myCos.upload(query,(d)=>{
        if(d.statusCode===200){
            let data = ({
                author: "hansu",
                title,
                cate,
                summary,
                content,
                cover_img:"https://"+d.Location,
                n_look: 1,
                n_like: 1,
                n_comment: 1,
                postTime: Date.now()
            });
            let newArticle=new articleModel(data)
            newArticle.save().then(() => {
                if (process.env.NODE_ENV === "production") {
                    cmder(`rm -f ./${filePath}*`).then(d => {
                        console.log(d)
                    })
                }
                else {
                    // 兼容windows
                    rmDirFiles(`./${filePath}`);
                }
                res.send({ code: 0 });
            });
        }
        else{
            res.send({code:1})
        }
    })

});


router.post("/articleEdit", (req, res) => {
    let { _id, title, cate, summary } = req.body;
    articleModel.findByIdAndUpdate(_id, { title, cate, summary }).then(() => {
        res.send({ code: 0 })
    });
});




router.post('/upload', upload.single('file'), (req, res) => {

    let { originalname, filename, path } = req.file;

    let i = originalname.lastIndexOf(".");

    filename = Date.now() + Math.ceil(Math.random() * 100) + originalname.substr(i - 1);

    fs.renameSync(path, "static/upload/" + filename, (err) => {
        if (err); throw err;
    })

    console.log(req.body)
    res.send({ message: "ok" });

})


module.exports = router;