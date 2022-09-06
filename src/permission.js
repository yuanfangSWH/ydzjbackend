import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

const Layout = () => import('./layout')
import system from './api/system' //配置api
const projectSystem = () => import('./views/system/projectSystem')//配置设置

let registerRouteFresh = true;

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/forgot'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  //判断是否有缓存
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
    //判断是否需要重新获取配置分类数据
    if (registerRouteFresh) {
      system.configCategory().then((res) => {
        var permission = res.data.data;
        /* 把配置分类数据存入VUEX */
        store.dispatch("updateVuex", {
          key: "temporaryZU",
          value: res.data.data,
        });
        var value = [];
        permission.map((item, index) => {
          value.push({
            path: '/projectSystem' + index,
            hidden: false,
            component: projectSystem,
            meta: {
              title: item.category_name,
              icon: 'dashboard'
            }
          })
        })
        var newRoutes = [{
          path: '/project',
          name: 'ProjectSystem',
          menuName: "ConfigManager",
          hidden: false,
          redirect: '/projectSystem',
          component: Layout,
          meta: {
            title: '配置',
            requireAuth: true,
            icon: 'dashboard'
          },
          children: value
        },]
        router.addRoutes(newRoutes)
        registerRouteFresh = false;
        next()
      });
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }

})

router.afterEach(() => {
  NProgress.done()
})
