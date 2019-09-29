// import request from "@/utils/request";

import { get, post, put, _delete } from "@/utils/helper/request"

//封装登录API
interface API {
  [proppName: string]: any;
}
class featureModel {

  GetList(params: API): Promise<any> {
    return get("feature/featureList", params)
  }

  AddFeature(data: API): Promise<any> {
    return post("feature/featureAdd", data)
  }

  EditFeature(data: API): Promise<any> {
    return put("feature/featureEdit", data)
  }

}

export default new featureModel()
