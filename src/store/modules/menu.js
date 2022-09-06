
import { getStaffmenu } from '@/api/menu'
// import { resetRouter } from '@/router'
// import qs from 'querystring'
const state = {

}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  }
}

const actions = {

  // 获取所有菜单
  getStaffmenu({ commit, state }) {
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
