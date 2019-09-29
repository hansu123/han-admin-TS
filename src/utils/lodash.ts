class Lodash {


  IsJSONStr(value: any) {
    try {
      if (JSON.parse(value) instanceof Object) {
        return true
      }
    }
    catch (err) {
      return false
    }
  }


  //深拷贝
  deepClone(source:object):object{
    if (!source && typeof source !== 'object') {
      throw new Error('error arguments')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  }

  //获取搜索的查询数据
  getSearchQueryData(d){
    return Object.keys(d).reduce((obj:object,key:string):object=>{
      if(d[key]!==''){
        return Object.assign(obj,{[key]:d[key]})
      }
      else{
        return obj
      }
    },{})
  }


}


export default  new  Lodash()