var COS = require('cos-nodejs-sdk-v5');
var cos = new COS({
  SecretId: 'AKIDZy85JLU2A3kqnhR3nRs89wUp14sgHbif',
  SecretKey: 'vQmuqWyB9vX3UZR6YophU4ScYGl18C4j'
});

//上传方法

let baseQuery={
  Bucket: 'hansu-1253325863',
  Region: 'ap-shanghai',
}


module.exports={
  upload:(query,cb)=>{
    let params=Object.assign(baseQuery,query)
    console.log(params)
    cos.putObject(params,function (err, data) {
      if(err){
        console.log(err)
      }
      cb(data)
    });
  }
}


//存储桶名称：hansu-1253325863 
//地域：ap-shanghai