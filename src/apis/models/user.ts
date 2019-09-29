import {get,post} from "@/utils/helper/request"
interface API {
  [proppName:string]:any;
}
class UserModel{
  GetList(params:API):Promise<any>{
    return get("user/userList",params)
  }

  AddUser(data:API):Promise<any>{
    return post("user/userAdd",data)
  }
}
export default new UserModel()