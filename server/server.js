const express = require("express");

const bodyParser = require("body-parser");

const server = express();

const cors = require("cors");

server.use(cors({
    credentials: true,//允许发送cookie
    // origin: 'http://localhost:3000', // web前端服务器地址
    origin:['http://localhost:8080','http://localhost:8081','http://49.235.18.58:8080']
    // origin: '*' // 这样会出错
}))

require("./config/mongo")

// 日志
const log4js = require('./config/log').log4js;
const logger = require('./config/log').logger;

server.listen(3300);
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use(bodyParser.json())

//头像插件
// const gravatar =require("gravatar")


//日志中间件
server.use(log4js.connectLogger(logger, {level:log4js.levels.INFO}))

//引入passport
const passport = require("passport");
//初始化
server.use(passport.initialize());


//路由
require("./routes")(server)
