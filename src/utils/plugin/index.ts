import { auth } from "../directive"
// import store from "@/store/store"
import storage from "@/utils/helper/storage"
import API from "@/apis"
import lodash from "@/utils/lodash"
//echarts
import echarts from "echarts"
const walden=require("@/lib/echart/walden.json")
echarts.registerTheme('walden', walden)
//xss
import {inHTMLData,uriInUnQuotedAttr} from "xss-filters-es6"
const xssFilter={inHTMLData,uriInUnQuotedAttr}
import bus from "vue"
export default {
  install(Vue) {
    Vue.directive("auth", auth)
    Vue.prototype.$bus = new bus()
    
    //挂载存储原型方法
    Vue.prototype.$storage = storage
    //挂载API原型方法
    Vue.prototype.$API = API
    //挂载lodash方法
    Vue.prototype.$lodash = lodash
    //挂载echarts
    Vue.prototype.$echarts=echarts
    //挂在xss
    Vue.prototype.$xssFilter=xssFilter
  }
}