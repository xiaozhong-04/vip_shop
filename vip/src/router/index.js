import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        component: () => import('@/components/Recommended.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/regist',
    component: () => import('@/components/Regist.vue')
  },
  {
    path: '/setpassword',
    component: () => import('@/components/Setpassword.vue')
  },
  // 找回密码步骤1
  {
    path: '/findpassstep1',
    component: () => import('@/components/FindpassStep1.vue')
  },
  // 步骤2
  {
    path: '/findpassstep2',
    component: () => import('@/components/FindpassStep2.vue')
  },
  {
    path: '/affirmorder',
    component: () => import('@/components/Affirmorder.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/shopcart',
    component: () => import('@/components/Shopcart.vue')
  },
  // 收银台
  {
    path: '/cashierdesk',
    component: () => import('@/components/Cashierdesk.vue')
  },
  // 支付确认
  {
    path: '/affirmpay',
    component: () => import('@/components/Affirmpay.vue')
  },
  {
    path: '/me',
    component: () => import('../components/Personal/Me.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/payment',
    component: () => import('../components/Personal/Payment.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/receipt',
    component: () => import('../components/Personal/Receipt.vue')
  },
  {
    path: '/goods',
    component: () => import('../components/Goods.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/alloreder',
    component: () => import('../components/Personal/allOreder.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/shopping',
    component: () => import('../components/Personal/Shopping.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/browsing',
    component: () => import('../components/Personal/Browsing.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/address',
    component: () => import('../components/Personal/Address.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/editpassword',
    component: () => import('../components/Personal/editPassword.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/editmobile',
    component: () => import('../components/Personal/editMobile.vue'),
    children: [
      {
        path: '/',
        component: () => import('../components/Personal/validationMobile.vue')
      },
      {
        path: '/confirm_mobile',
        component: () => import('../components/Personal/confirmMobile.vue')
      }
    ],
    meta: {
      isLogin: true
    }
  },
  {
    path: '/collection',
    component: () => import('../components/Personal/Collection.vue'),
    meta: {
      isLogin: true
    }
  },
  {
    path: '/brand',
    component: () => import('../views/brand.vue')
  },
  {
    path: '/shopdes/:id',
    component: () => import('@/components/shopdetails.vue'),
    props: true
  },
  {
    path: '/classify',
    component: () => import('@/components/Classify.vue')
  },
  {
    path: '/sort/:id',
    component: () => import('@/components/Sort.vue'),
    props: true
  },
  {
    path: '/goods/:id',
    component: () => import('@/components/Goods.vue'),
    props: true
  },
  {
    path: '/edit',
    component: () => import('@/components/Personal/AddressEdit.vue')
  }
]
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta !== undefined && to.meta.isLogin !== undefined && to.meta.isLogin === true) {
    let token = localStorage.getItem('token')
    if (token === null) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
