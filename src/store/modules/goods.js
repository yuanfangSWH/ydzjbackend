import {
  getGoodsClass,
  addGoodsClass,
  deleteGoodsClass,
  getGoodsClassDetail,
  updateGoodsClass,
  getGoodsList,
  getGoodsDetail,
  updateGoods,
  deleteGoods,
  addGoods,
  getGroupBuyList,
  getGroupBuyDetail,
  updateGroupBuy,
  deleteGroupBuy,
  addGroupBuy,
  getGroupBuySelectGoods,
  goodsUpDown
} from '@/api/goods'
// import { resetRouter } from '@/router'
import {
  getToken
} from '@/utils/auth'
import qs from 'querystring'

const getDefaultState = () => {
  return {
    user_token: getToken(),
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
    state.user_token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 获取商品分类列表
  getGoodsClass({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGoodsClass(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取商品分类详情
  getGoodsClassDetail({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGoodsClassDetail(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增商品分类
  addGoodsClass({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      addGoodsClass(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除商品分类
  deleteGoodsClass({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteGoodsClass(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 编辑商品分类
  updateGoodsClass({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateGoodsClass(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取商品列表
  getGoodsList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGoodsList(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取商品详情
  getGoodsDetail({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGoodsDetail(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 编辑商品
  updateGoods({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateGoods(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除商品
  deleteGoods({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteGoods(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增商品
  addGoods({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      addGoods(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取团购套餐列表
  getGroupBuyList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGroupBuyList(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取团购套餐详情
  getGroupBuyDetail({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGroupBuyDetail(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 编辑团购套餐
  updateGroupBuy({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateGroupBuy(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 删除团购套餐
  deleteGroupBuy({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteGroupBuy(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 新增团购套餐
  addGroupBuy({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      addGroupBuy(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 添加套餐组合输入关键字快速匹配
  getGroupBuySelectGoods({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getGroupBuySelectGoods(state.user_token, datas).then(response => {
        const {
          data
        } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //商品上下架
  goodsUpDown({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      goodsUpDown(state.user_token, datas).then(response => {
        const {
          data
        } = response
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
