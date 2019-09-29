import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router'
import store from '@/store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//粒子特效
import VueParticles from 'vue-particles'  
Vue.use(VueParticles) 

Vue.config.productionTip = false


//引入样式
import "@/styles/index.scss"

//iconfont图标样式
import "@/assets/css/iconfont.css";

//懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // preload:1.3,//预加载的宽高
  loading:"@/common/img/boy.png",
  error:"@/common/img/err.jpg",
  attempt:3,//尝试加载的次数
  listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove'], //你想让vue监听的事件
})


//语言
import VueI18n from "vue-i18n"
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:'zh',//语言标识，默认为中文
  messages:{
    'zh':require('@/lang/zh/index'),
    'en':require('@/lang/en/index')
  }
})



//全局组件
const files =require.context("@/components/common",false,/\.vue$/)
files.keys().forEach(fileName=>{
  let key=fileName.replace(/(^\.\/|\.vue$)/g,"")
  console.log(files(fileName).default)
  Vue.component(key,files(fileName).default)
})


import filters from "@/utils/filter/index.ts"
Object.keys(filters).forEach((key) => {
	Vue.filter(key, filters[key])
})


//自定义插件
import myPlugin from "@/utils/plugin"
Vue.use(myPlugin)
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
