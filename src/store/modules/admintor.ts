import { SET_TOKEN, SET_ROLEINFO, SET_ROLEROUTE,SET_ROUTE } from "@/store/utils/mutationType";
import dejwt from 'jwt-decode'
import asyncRouter from "@/router/asyncRouter"
import API from "@/apis"
import storage from "@/utils/helper/storage"
import router from "@/router/router"
import {Loading,Message} from "element-ui";

var loading

function startLoading():void{
  loading = Loading.service({
    lock: true,
    text: "拼命加载中",
    background: "rgba(0,0,0,0.7)"
  })
}

function closeLoading():void{
  loading.close()
}

interface AdmintorObj{
namespaced:boolean,
state:any,
getters?:any,
mutations?:any,
actions?:any
}

const admintor:AdmintorObj = {
  namespaced: true,
  state: {
    token: storage.get("eleToken")||"",
    roleInfo: <string>storage.get('roleInfo')||null,
    roleRoute: undefined,
    allRoute:undefined
  },
  mutations: {
    [SET_TOKEN](state:any, token:string) {
      state.token = token;
      storage.set("eleToken",token)
    },
    [SET_ROLEINFO](state:any, myToken:any) {
      state.roleInfo = myToken;
      storage.set("roleInfo",myToken)
    },
    [SET_ROLEROUTE](state:any, route:any[]) {
      state.roleRoute = route;
    },
    [SET_ROUTE](state:any, route:any[]) {
      state.allRoute = route;
    },
  },
  actions: {
    async checkLogin({commit}:any, payload:any) {
      startLoading()
      let d = await API.admintorModel.signIn(payload);
      if(d.code===0){
        const { token } = d;
        let myToken = dejwt(token);
        commit(SET_TOKEN, token);
        commit(SET_ROLEINFO, myToken);
        Message({
          type:"success",
          message:"登录成功"
        })
        setTimeout(()=>{
          closeLoading()
          router.push("/home")
        },1000)
      }
      else{
        closeLoading()
        Message({
          type:"error",
          message:"登录失败"
        })
      }
    },
    async signUpAction({commit}:any, payload:any) {
      startLoading()
      let d = await API.admintorModel.Regist(payload);
      if(d.code===0){
        Message({
          type:"success",
          message:"注册成功"
        })
        setTimeout(()=>{
          closeLoading()
          router.push("/signIn")
        },1000)
      }
      else{
        closeLoading()
        Message({
          type:"error",
          message:"注册失败"
        })
      }
    },
    async signOutAction({commit}:any):Promise<any>{
      storage.remove("eleToken");
      storage.remove("roleInfo");
      commit(SET_TOKEN, "");
      commit(SET_ROLEINFO, {});
      Message({
        type: "success",
        message: "退出成功!"
      });
      router.push("/signIn");
    },
    async getRoute({ commit }:any) {
      let { identity } = storage.get("roleInfo");
      let d = await API.admintorModel.getRoutes({ identity })
   
      // let treeRoutes = emitTree(d.data, 'R_ID', 'R_PID')
      commit(SET_ROLEROUTE, d)
    },
    async getAllowedRoute({state,commit}:any){
      // console.log(state.roleRoute)
      let finalRoutes = getFinalRoute(state.roleRoute)
      // console.log(finalRoutes)
      commit(SET_ROUTE, finalRoutes)
    }
  }
}

function getFinalRoute(routes:any[]) {
  // let localRoutes=handleTreeData(asyncRouter) 
  // console.log(localRoutes)
  let firstRouters=routes;
  let allowedRouter:any[]=[]
  let findLocalRoute = function(array:any[], base:boolean=false) {
    let replyResult:any[] = [];
    array.forEach(function(route) {
      
      if (compareRouter(firstRouters,route)){
        if (Array.isArray(route.children)) {
          route.children = findLocalRoute(route.children, route.path);
        };
        replyResult.push(route);
      }
    });
    if (base) {
      return replyResult;
    } else {
      allowedRouter = allowedRouter.concat(replyResult);
    }
  };
  findLocalRoute(asyncRouter);
  
  return allowedRouter;

  function compareRouter(routes:any[], val:any) {
    let isRouter = routes.filter((route) => {
      return route.route == val.name
    })
    return isRouter.length ? true : false
  }
}

export default admintor;