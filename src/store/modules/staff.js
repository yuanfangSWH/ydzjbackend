
import { staffList, staffDetail ,staffRoleList ,deleteStaff ,insertStaff ,updateStaff ,setStaffRole,
    roleList, roleMenuIdList, updateRole, setRoleMenu, insertRole, 
    staffMenu, staffAllMenu, staffMenuInfo, } from '@/api/staff'
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

  // 获取员工菜单
  staffMenu({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        staffMenu(state.x_token,datas).then(response => {
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
  // 获取员工列表
  staffList({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        staffList(state.x_token,datas).then(response => {
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
  // 获取员工详情
  staffDetail({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        staffDetail(state.x_token,datas).then(response => {
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
  // 获取员工角色列表
  staffRoleList({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        staffRoleList(state.x_token,datas).then(response => {
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
  // 删除角色
  deleteStaff({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        deleteStaff(state.x_token,datas).then(response => {
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
  // 新增角色
  insertStaff({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        insertStaff(state.x_token,datas).then(response => {
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
  // 修改员工
  updateStaff({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        updateStaff(state.x_token,datas).then(response => {
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
  // 设置员工角色
  setStaffRole({ commit, state },data) {
    const datas = data
    return new Promise((resolve, reject) => {
        setStaffRole(state.x_token,datas).then(response => {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
