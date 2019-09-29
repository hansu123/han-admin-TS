const mongoose = require("mongoose")
const mySchema = mongoose.Schema;
let userSchema = new mySchema({
  creatAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  },
  name: String,
  email:String,
  identity: String,
  isOnline: Boolean
})
module.exports = userSchema