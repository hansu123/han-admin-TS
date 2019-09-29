// import request from "@/utils/request";

import { get, post, put, _delete } from "@/utils/helper/request"

//封装登录API
interface API {
  [proppName: string]: any;
}
class BugModel {

  GetList(params: API): Promise<any> {
    return get("bug/bugList", params)
  }

  AddBug(data: API): Promise<any> {
    return post("bug/bugAdd", data)
  }

  EditBug(data: API): Promise<any> {
    return put("bug/bugEdit", data)
  }

}

export default new BugModel()
