const mongoose=require("mongoose")

//密码加密
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema;

var mySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    identity: {
        type: String,
        required: true
    },
    creatAt:{
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
})

//pre中间件
mySchema.pre("save",function (next){
    bcrypt.genSalt(10, (err, salt)=>{
        if(err){return next(err)}
        bcrypt.hash(this.password, salt, (err, hash)=>{
            if(err){
                return next(err)
            }
            this.password=hash
            next()
        });
    });
})


//实例方法，比较密码
mySchema.methods.comparePwd=function (_password){
    return bcrypt.compareSync(_password,this.password)
}

module.exports=mySchema