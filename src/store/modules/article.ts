import API from "@/apis";
import { SET_ARTICLE,SET_ARTICLETOTAL } from "../utils/mutationType"
import {Message} from "element-ui"
let {GetList,DelArticle} =API.articleModel
const admintor = {
  namespaced: true,
  state: {
    articleList: [],
    articleTotal:0
  },
  mutations: {
    [SET_ARTICLE](state, d) {
      state.articleList = d;
    },
    [SET_ARTICLETOTAL](state, d) {
      state.articleTotal = d;
    },
  },
  actions: {
    async getListAction({ commit }, params) {
      let d = await GetList(params);
      commit(SET_ARTICLE, d.list);
      commit(SET_ARTICLETOTAL, d.total);
      return d
    },
    async delArticleAction({ commit,state }, id) {
      let d = await DelArticle({id})
      if(d.code===0){
        let list=state.articleList.reduce((list,item)=>{
          item._id!=id&&list.push(item)
          return list
        },[])
        commit(SET_ARTICLE, list);
        commit(SET_ARTICLETOTAL, --state.articleTotal);
        Message({
          message: "删除成功",
          type: "success"
        });
      }
      else{
        Message({
          message: "删除失败",
          type: "error"
        });
      }
      return d
    },
  }
}

export default admintor;