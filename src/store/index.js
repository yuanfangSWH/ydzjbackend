import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import login from './modules/login'
import shop from './modules/shop'
import staff from './modules/staff'
import commonName from './modules/commonName'
import goods from './modules/goods'
import LoginIm from "./login";//登录环信通讯
import Chat from "./chat";
import Group from "./group";
Vue.use(Vuex)

const state = {
  loading: false,
  loginstatic: false,
  showCitySelectBox: false,
  userLoginInfo: '',
  userinfo: {},

  evalDetailId: '',
  //组件标题
  pageTitle: '',
  classification: [],
  //帖子标题存储
  title: "",
  //ID存储
  merchantsData: [],
  //万用临时存储数据{}
  temporaryData: {},
  //万用临时存储数据
  temporaryZU: [],
  //筛选条件存储
  screeningData: {},
  //图片域名存储
  oss_url: ""
}

const mutations = {
  updateVuex(state, object) {
    state[object.key] = object.value
  },
  UPDATEVUEX: (state, object) => {
    state[object.key] = object.value
  }
}

const actions = {
  updateVuex({ commit }, object) {
    commit('UPDATEVUEX', object)
  }
}

export default new Vuex.Store({
  modules: {
    app,
    settings,
    login,
    shop,
    staff,
    commonName,
    goods,
    LoginIm,
    chat: Chat,
    group: Group,
  },
  getters,
  state,
  actions,
  mutations
})

