/*
 * @Author: your name
 * @Date: 2020-11-18 20:02:05
 * @LastEditTime: 2021-01-07 13:48:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\main.js
 */
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import request from '@/utils/request'
import store from './store'
import router from './router'
import utils from './utils/utils'

//拖放组件，需要全局注册。局部注册会报错——朱强注，2020-12-14。
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)

//用户信息弹框组局
import userBounced from './components/userBounced/userBounced'
Vue.component('userBounced', userBounced)
//返回按钮组件
import goBack from './components/goback/goback'
Vue.component('goBack', goBack)
//Icon图标
import SvgIcon from "@/components/SvgIcon";
Vue.component('SvgIcon', SvgIcon)
import '@/icons' // icon
import '@/permission' // permission control
// import promise from 'es6-promise'
// import store from './store'
import Axios from 'axios'
import qs from 'querystring'
//封装的axios方法
import api from './api/api'
import VueAMap from 'vue-amap';
Vue.prototype.api = api
Vue.use(api)
// import { BaiduMap, BmGeolocation } from 'vue-baidu-map'// 百度地图
// promise.polyfill()
Vue.prototype.$request = request
Vue.prototype.$qs = qs
Vue.prototype.$ajax = Axios
//vue-img-cutter图片插件
import Imgcutter from 'vue-img-cutter'
Vue.component('Imgcutter', Imgcutter)


Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: 'f5f32834dea507a792acdcefea534218', //这里是你的高德开发者key
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
  uiVersion: '1.0.11',
  v: '1.4.4'
});

// 接口地址
// Vue.prototype.$apiUrl = api
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use([BaiduMap, BmGeolocation], {
//   ak: 'HAxCzkyeepnUt21llSGMuATawZDoUFCN'
// })
Vue.use(utils)
Vue.use(ElementUI)
Vue.config.productionTip = false
window.Vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
