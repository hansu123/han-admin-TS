const fs=require("fs")
const path = require('path');
const {exec} =require('child_process')
//window删除脚本插件
const fileTool = require('fs-extra');

const cmder=(cmd)=>{
    console.log(cmd)
    return new Promise((resolve,reject)=>{
        exec(cmd,(error,stdout,stderr)=>{
            if(error){
                reject(error)
            }
            else{
                resolve("删除成功")
            }
        })
    })
}

const rmDirFiles = dir => {
    const dirPath = fs.readdirSync(dir);
    dirPath.map(item => {
        const currentPath = path.join(dir, item);
        console.log(`rmove ${currentPath}`);
        fileTool.removeSync(currentPath);
    });
}

module.exports={cmder,rmDirFiles}