import { login, logout, getInfo, getStaffmenu, getStaffInfo, phoneLogin, getCaptcha, resetPsw } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
// import menu from './menu'
import qs from 'querystring'

//获取token组合
const getDefaultState = () => {
  return {
    x_token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.x_token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户账号登录
  login({ commit }, userInfo) {
    const datas = userInfo
    return new Promise((resolve, reject) => {
      login(datas).then((response) => {
        const { data } = response;
        commit('SET_TOKEN', response.headers['access-token'])
        setToken(response.headers['access-token'])
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户手机登录
  phoneLogin({ commit }, userInfo) {
    const datas = userInfo
    return new Promise((resolve, reject) => {
      phoneLogin(datas).then((response) => {
        const { data } = response;
        commit('SET_TOKEN', response.headers['access-token'])
        setToken(response.headers['access-token'])
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置密码
  resetPsw({ commit }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      resetPsw(datas).then((response) => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取手机验证码--登录
  getCaptcha({ commit }, userInfo) {
    const datas = userInfo
    return new Promise((resolve, reject) => {
      getCaptcha(datas).then((response) => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // // 获取店铺列表
  // getShopList({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getShopList(state.x_token).then(response => {
  //       const { data } = response
  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.x_token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有导航菜单(扁平JSON格式)
  getStaffmenu({ commit, state }) {
    console.log('getMenuApi')
    return new Promise((resolve, reject) => {
      getStaffmenu(state.x_token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取所有导航菜单(JSON格式)
  getStaffInfo({ commit, state }) {
    // console.log('getMenuInfoApi')
    return new Promise((resolve, reject) => {
      getStaffInfo(state.x_token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.x_token).then(() => {
        removeToken()  //清除在缓存里的token
        resetRouter()
        commit('RESET_STATE')
        //sessionStorage.removeItem('userInfo')
        // sessionStorage.removeItem('resultMenu')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

// const actions = Object.assign(menu, userActions)

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

