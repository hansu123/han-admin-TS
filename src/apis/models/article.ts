// import request from "@/utils/request";

import { get, post, put, _delete } from "@/utils/helper/request"

//封装登录API
interface API {
  [proppName: string]: any;
}
class ArticleModel {

  GetList(params: API): Promise<any> {
    return get("article/articleList", params)
  }

  GetTagList(params:API):Promise<any>{
    return get("article/tagList",params)
  }

  DelArticle(data: API): Promise<any> {
    return _delete("article/articleDelete", data)
  }

  AddArticle(data: API): Promise<any> {
    return post("article/articleAdd", data)
  }

  EditArticle(data: API): Promise<any> {
    return put("article/articleEdit", data)
  }

}

export default new ArticleModel()
