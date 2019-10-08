const routes: any =
  [
    {
      path: '/index',
      name: 'index',
      component: () => import("@/views/layout/index.vue"),
      redirect: '/home',
      children: [
        { path: '/home', name: 'home', component: () => import("@/views/home/index.vue"), meta: { icon: ['iconfont', 'icon-home_pho'], title: "home" } },
        {
          path: '/article', name: 'article', component: () => import("@/views/article/index.vue"), meta: { icon: ['iconfont', 'icon-shouye'], title: "article" },
          children: [
            { path: '/article/articleList', name: 'articleList', component: () => import("@/views/article/subpage/article.vue"), meta: { title: "articleList" } },
            { path: '/article/addArticle', name: 'addArticle', component: () => import("@/views/article/subpage/add.vue"), meta: { title: "addArticle" } },
          ],
        },
        { path: '/user', name: 'user', component: () => import("@/views/user/user.vue"), meta: { icon: ['iconfont', 'icon-yuangongguanli'], title: "user" } },
        {
          path: '/chart', name: 'chart', component: () => import("@/views/chart/index.vue"), meta: { icon: ['iconfont', 'icon-shuju'], title: "chart" },
          children: [
            { path: '/chart/barChart', name: 'barChart', component: () => import("@/views/chart/barChart.vue"), meta: { title: "barChart" } },
            { path: '/chart/lineChart', name: 'lineChart', component: () => import("@/views/chart/lineChart.vue"), meta: { title: "lineChart" } }
          ]
        },
        { path: '/organize', name: 'organize', component: () => import("@/views/organize/organize.vue"), meta: { icon: ['iconfont', 'icon-jiagou'], title: "organize" } },
        {
          path: '/plan', name: 'plan', component: () => import("@/views/plan/index.vue"), meta: { icon: ['iconfont', 'icon-rizhi'], title: "plan" },
          children: [
            { path: '/plan/bug', name: 'bug', component: () => import("@/views/plan/bug/bug.vue"), meta: { title: "bug" } },
            { path: '/plan/feature', name: 'feature', component: () => import("@/views/plan/feature/feature.vue"), meta: { title: "feature" } }
          ]
        },
        { path: '/log', name: 'log', component: () => import("@/views/log/log.vue"), meta: { icon: ['iconfont', 'icon-rizhi'], title: "log" } },
      ]
    }
  ]
export default routes;
