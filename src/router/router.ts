import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import NProgress from 'nprogress'
import store from "@/store/store"
import baseRoutes from "./baseRouter"
import asyncRoutes from "./asyncRouter"
console.log(...asyncRoutes)
interface RouterInterface {
  mode: any,
  routes: any,
}

let config: RouterInterface =
{
  mode: 'history',
  routes: [
    ...asyncRoutes,
    ...baseRoutes
  ]
}

const router = new Router(config)

router.beforeEach(
  (to, from, next) => {
    if (["/signIn", "/signUp"].includes(to.path)) {
      next()
    }
    else {
      if ((store as any).state.admintor.token) {
        store.dispatch("admintor/getRoute").then(() => {
          store.dispatch("admintor/getAllowedRoute").then(() => {
            NProgress.start()
            next()// hack方法 确保addRoutes已完成 ,
          })
        });
      }
      else {
        next("/signIn")
      }
    }
  }
)

router.afterEach(() => {NProgress.done()})

export default router