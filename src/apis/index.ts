//api中model配置文件
const files=require.context("./models",false,/\.ts$/)
const models=files.keys().reduce((models:any,fileName)=>{
  let key=fileName.replace(/(^\.\/|\.ts$)/g,"")
  return Object.assign(models,{[`${key}Model`]:files(fileName).default})
},{})

export default models