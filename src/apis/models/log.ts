// import request from "@/utils/request";

import { get ,post} from "@/utils/helper/request"

//封装登录API
interface API {
  [proppName: string]: any;
}
class LogModel {

  GetList(params: API): Promise<any> {
    return get("log/logList", params)
  }

  AddLog(data:API):Promise<any>{
    return post("log/logAdd",data)
  }

}

export default new LogModel()
