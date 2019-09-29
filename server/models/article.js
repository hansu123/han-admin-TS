const mongoose = require("mongoose");
const articleSchema = require("../schemas/article")
let articleModel = mongoose.model("articles", articleSchema, "articles");
module.exports = articleModel