import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const context = require.context('./modules', true, /\.ts$/);
let modules={}
context.keys().forEach((fileName)=>{
	let key=fileName.replace(/(^\.\/)|(\.ts$)/ig,"")
	modules[key]=context(fileName).default
})

export default new Vuex.Store({
  modules,
  getters:{
    token:(state:any)=>state.admintor.token,
    roleInfo:(state:any)=>state.admintor.roleInfo
  },
  actions: {
    
  }
})
