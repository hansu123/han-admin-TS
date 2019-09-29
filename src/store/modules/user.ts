import { SET_USER } from "../utils/mutationType"
import API from "@/apis"

const user = {
  namespaced: true,
  state: {
    userList: []
  },
  getters: {
    userList(state) {
      return state.userList
    }
  },
  mutations: {
    [SET_USER](state, payload) {
      state.userList = payload;
    }
  },
  actions: {
    async getUserAction({ commit },params) {
      let d = await API.userModel.GetUser(params);
      commit(SET_USER, d.list);
    }
  },
}
export default user;