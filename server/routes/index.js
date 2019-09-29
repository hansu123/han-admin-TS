module.exports=(server)=>{
const adminRouter = require("./admin");
server.use("/admin", adminRouter);
const articleRouter = require("./article");
server.use("/article", articleRouter);
const userRouter = require("./user");
server.use("/user", userRouter);
const routeRouter = require("./route");
server.use("/route", routeRouter);
const bugRouter = require("./bug");
server.use("/bug", bugRouter);
const featureRouter = require("./feature");
server.use("/feature", featureRouter);
const logRouter = require("./log");
server.use("/log", logRouter);
}