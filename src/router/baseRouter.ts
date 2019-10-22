const routes =
  [
  {
    path: '/',
    name: 'signIn',
    component:()=>import('@/views/sign/signIn.vue')
  },
  // {
  //   path: '/signup',
  //   name: 'signup',
  //   component: () => import("@/views/sign/signUp.vue")
  // },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import("@/views/sign/signIn.vue")
  },
  {
    path:"*",
    name: '404',
    component:()=>import("@/views/error/notFound.vue")
  }
  ]


export default routes;
