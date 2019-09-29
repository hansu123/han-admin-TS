const mongoose = require("mongoose");
let url = "mongodb://hansu:199633@49.235.18.58:27017/blogAdmin"

mongoose.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true});

mongoose.connection.on("error", function() {
    console.log("error");
});
mongoose.connection.on("open", function() {
    console.log("success");
});

module.exports=mongoose