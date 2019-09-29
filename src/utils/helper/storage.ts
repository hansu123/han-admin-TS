import lodash from "@/utils/lodash"
class Storage{
get(key:string):any{
  let value:string=<string>localStorage.getItem(key)
  return lodash.IsJSONStr(value)?JSON.parse(value):value
}
set(key:string,value:any){
  if(value instanceof Object){
    localStorage.setItem(key,JSON.stringify(value))
  }
  else{
    localStorage.setItem(key,value)
  }
}
has(key:string){
  return localStorage.getItem(key)?true:false
}
remove(key:string){
  localStorage.removeItem(key)
}
clear(){
  localStorage.clear()
}
}
export default new Storage()