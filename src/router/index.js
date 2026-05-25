import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'SearchList',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '用户列表', icon: 'el-icon-pie-chart' }
    }, {
      path: 'detail2',
      name: 'UserDetail',
      hidden: true,
      component: () => import('@/views/dashboard/detail2'),
      meta: { title: '查看下级', icon: 'el-icon-s-data' }
    }, {
      path: 'land',
      name: 'Land',
      hidden: true,
      component: () => import('@/views/dashboard/land'),
      meta: { title: '土地', icon: 'el-icon-s-data' }
    }, {
      path: 'backpack',
      name: 'Backpack',
      hidden: true,
      component: () => import('@/views/dashboard/backpack'),
      meta: { title: '背包', icon: 'el-icon-s-data' }
    }, {
      path: 'buy',
      name: 'Buy',
      hidden: true,
      component: () => import('@/views/dashboard/buy'),
      meta: { title: '认购信息', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/recharge',
    component: Layout,
    redirect: '/recharge',
    children: [{
      path: 'recharge',
      name: 'RechargeList',
      component: () => import('@/views/recharge/index'),
      meta: { title: '充值列表', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game',
    children: [{
      path: 'game',
      name: 'GameList',
      component: () => import('@/views/game/index'),
      meta: { title: '游戏收益', icon: 'el-icon-s-data' }
    }]
  },
  // {
  //   path: '/buy',
  //   component: Layout,
  //   redirect: '/buy',
  //   children: [{
  //     path: 'buy',
  //     name: 'BuyList',
  //     component: () => import('@/views/buy/index'),
  //     meta: { title: '认购收益', icon: 'el-icon-s-data' }
  //   }]
  // },
  {
    path: '/withdraw',
    component: Layout,
    redirect: '/withdraw',
    children: [{
      path: 'withdraw',
      name: 'WithdrawList',
      component: () => import('@/views/withdraw/index'),
      meta: { title: '提现列表', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/landlist',
    component: Layout,
    redirect: '/landlist',
    children: [{
      path: 'landlist',
      name: 'LandList',
      component: () => import('@/views/land/index'),
      meta: { title: '土地列表', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/seedlist',
    component: Layout,
    redirect: '/seedlist',
    children: [{
      path: 'seedlist',
      name: 'SeedList',
      component: () => import('@/views/seed/index'),
      meta: { title: '种子列表', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/toollist',
    component: Layout,
    redirect: '/toollist',
    children: [{
      path: 'toollist',
      name: 'ToolList',
      component: () => import('@/views/tool/index'),
      meta: { title: '道具列表', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/blindbox',
    component: Layout,
    redirect: '/blindbox',
    children: [{
      path: 'blindbox',
      name: 'BlindBox',
      component: () => import('@/views/blindbox/index'),
      meta: { title: '盲盒设置', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/otherlist',
    component: Layout,
    redirect: '/otherlist',
    children: [{
      path: 'otherlist',
      name: 'OtherList',
      component: () => import('@/views/other/index'),
      meta: { title: '其他设置', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/send',
    component: Layout,
    redirect: '/send',
    children: [{
      path: 'send',
      name: 'Send',
      component: () => import('@/views/send/index'),
      meta: { title: '添加道具', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/auction',
    component: Layout,
    redirect: '/auction',
    children: [{
      path: 'auction',
      name: 'Auction',
      component: () => import('@/views/auction/index'),
      meta: { title: '拍卖土地', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/sendseed',
    component: Layout,
    redirect: '/sendseed',
    children: [{
      path: 'sendseed',
      name: 'SendSeed',
      component: () => import('@/views/sendseed/index'),
      meta: { title: '管理员发放种子', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/sendtool',
    component: Layout,
    redirect: '/sendtool',
    children: [{
      path: 'sendtool',
      name: 'SendTool',
      component: () => import('@/views/sendtool/index'),
      meta: { title: '管理员发放道具', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/sendland',
    component: Layout,
    redirect: '/sendland',
    children: [{
      path: 'sendland',
      name: 'SendLand',
      component: () => import('@/views/sendland/index'),
      meta: { title: '管理员发放土地', icon: 'el-icon-s-data' }
    }]
  },
  {
    path: '/messagelist',
    component: Layout,
    redirect: '/messagelist',
    children: [{
      path: 'messagelist',
      name: 'MessageList',
      component: () => import('@/views/message/index'),
      meta: { title: '系统消息列表', icon: 'el-icon-s-data' }
    }]
  },
  // {
  //   path: '/record',
  //   component: Layout,
  //   redirect: '/record',
  //   children: [{
  //     path: 'record',
  //     name: 'RecordList',
  //     component: () => import('@/views/record/index'),
  //     meta: { title: '订单管理', icon: 'el-icon-s-data' }
  //   }, {
  //     path: 'add',
  //     name: 'AddOrder',
  //     hidden: true,
  //     component: () => import('@/views/record/add'),
  //     meta: { title: '添加订单', icon: 'el-icon-s-data' }
  //   }]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
