import {get,post} from "@/utils/helper/request"
interface API {
  [proppName:string]:any;
}
class AdmintorModel{
 signIn(data:API){
   return post("/admin/login",data)
 }
 Regist(data:API){
  return post("/admin/regist",data)
 }
 getRoutes(params:API){
  return get("route/routeList",params)
 }
 AddUser(data){
  return post("/admin/register",data)
 }
}

export default new AdmintorModel()