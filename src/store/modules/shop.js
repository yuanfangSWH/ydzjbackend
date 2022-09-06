import {
  getShopInfo,
  getShopDetail,
  insertShop,
  updateShop,
  deleteShop,
  getShopType,
  getShopTypeDetail,
  insertShopType,
  updateShopType,
  deleteShopType,
  getMerchant,
  getMerchantDetail,
  insertMerchant,
  updateMerchant,
  deleteMerchant,
  getCitySelectList,
  getFileSts,
  getPlaceType,
  getPlaceArea,
  getPlaceRule,
  placeList,
  createPlaceType,
  updatePlaceType,
  deletePlaceType,
  createPlaceArea,
  updatePlaceArea,
  deletePlaceArea,
  addPlaceRule,
  getPlaceDetail,
  updatPlace,
  deletePlace,
  addPlaceList,
  updatPlaceList,
  updatPlaceList_batch,
  deletePlaceList,
  recoveryPlaceList,
  printerList,
  insertPrinter,
  deletePrinter,
  updatePrinter,
  evaluateList,
  evaluateDetail,
  evaluateReply,
  shopMark
} from '@/api/shop'
// import { resetRouter } from '@/router'
import {
  getToken
} from '@/utils/auth'

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
  doAction({
    commit,
    state
  }, actionName, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getShopDetail(state.x_token, params).then(response => {
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
  // 获取店铺列表
  getShopInfo({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getShopInfo(state.x_token, params).then(response => {
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

  // 获取店铺详情
  getShopDetail({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getShopDetail(state.x_token, params).then(response => {
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
  // 新增商铺
  insertShop({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      insertShop(state.x_token, data).then(response => {
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
  // 更新店铺信息
  updateShop({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateShop(state.x_token, datas).then(response => {
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
  // 删除店铺
  deleteShop({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteShop(state.x_token, datas).then(response => {
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


  // 获取店铺列表
  getShopType({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getShopType(state.x_token, params).then(response => {
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
  // 获取店铺详情
  getShopTypeDetail({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getShopTypeDetail(state.x_token, params).then(response => {
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
  // 新增商铺
  insertShopType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      insertShopType(state.x_token, data).then(response => {
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
  // 更新店铺信息
  updateShopType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateShopType(state.x_token, datas).then(response => {
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
  // 删除店铺
  deleteShopType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteShopType(state.x_token, datas).then(response => {
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


  // 获取商家列表
  getMerchant({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getMerchant(state.x_token, params).then(response => {
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
  // 获取商家详情
  getMerchantDetail({
    commit,
    state
  }, data) {
    const params = data
    return new Promise((resolve, reject) => {
      getMerchantDetail(state.x_token, params).then(response => {
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
  // 新增商家
  insertMerchant({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      insertMerchant(state.x_token, data).then(response => {
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
  // 更新商家信息
  updateMerchant({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updateMerchant(state.x_token, datas).then(response => {
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
  // 删除商家
  deleteMerchant({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deleteMerchant(state.x_token, datas).then(response => {
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



  // 获取二级城市列表
  getCitySelectList({
    commit,
    state
  }, id) {
    const params = id
    return new Promise((resolve, reject) => {
      getCitySelectList(state.user_token, params).then(response => {
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

  // 获取上传秘钥
  getFileSts({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getFileSts(state.user_token).then(response => {
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
  // 获取座位类型列表
  getPlaceType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getPlaceType(state.user_token, datas).then(response => {
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
  // 获取位置区域列表
  getPlaceArea({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getPlaceArea(state.user_token, datas).then(response => {
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
  // 获取座位规则列表
  getPlaceRule({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getPlaceRule(state.user_token, datas).then(response => {
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
  // 座位管理列表
  placeList({
    commit,
    state
  }, data) {
    let datas = data
    return new Promise((resolve, reject) => {
      placeList(state.user_token, datas).then(response => {
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
  // 添加位置类型
  createPlaceType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      createPlaceType(state.user_token, datas).then(response => {
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
  // 更新位置类型
  updatePlaceType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatePlaceType(state.user_token, datas).then(response => {
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
  // 删除位置类型
  deletePlaceType({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deletePlaceType(state.user_token, datas).then(response => {
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
  // 添加位置区域
  createPlaceArea({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      createPlaceArea(state.user_token, datas).then(response => {
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
  // 更新位置区域
  updatePlaceArea({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatePlaceArea(state.user_token, datas).then(response => {
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
  // 删除位置区域
  deletePlaceArea({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deletePlaceArea(state.user_token, datas).then(response => {
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
  // 新增座位规则
  addPlaceRule({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      addPlaceRule(state.user_token, datas).then(response => {
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
  // 获取座位规则详情
  getPlaceDetail({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      getPlaceDetail(state.user_token, datas).then(response => {
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
  // 更新座位规则
  updatPlace({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatPlace(state.user_token, datas).then(response => {
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
  // 删除座位规则
  deletePlace({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deletePlace(state.user_token, datas).then(response => {
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
  //座位管理新增
  addPlaceList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      addPlaceList(state.user_token, datas).then(response => {
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
  // 座位管理更新
  updatPlaceList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatPlaceList(state.user_token, datas).then(response => {
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
  // 座位管理批量更新
  updatPlaceList_batch({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatPlaceList_batch(state.user_token, datas).then(response => {
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
  // 座位管理删除
  deletePlaceList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deletePlaceList(state.user_token, datas).then(response => {
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
  // 座位管理还原
  recoveryPlaceList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      recoveryPlaceList(state.user_token, datas).then(response => {
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
  //打印机列表
  printerList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      printerList(state.user_token, datas).then(response => {
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

  //添加打印机
  insertPrinter({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      insertPrinter(state.user_token, datas).then(response => {
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

  //删除打印机
  deletePrinter({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      deletePrinter(state.user_token, datas).then(response => {
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

  //修改打印机
  updatePrinter({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      updatePrinter(state.user_token, datas).then(response => {
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
  //获取店铺评论列表
  evaluateList({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      evaluateList(state.user_token, datas).then(response => {
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

  //获取店铺评论详情
  evaluateDetail({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      evaluateDetail(state.user_token, datas).then(response => {
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

  //商家回复评论
  evaluateReply({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      evaluateReply(state.user_token, datas).then(response => {
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

  // 店铺入驻备注
  shopMark({
    commit,
    state
  }, data) {
    const datas = data
    return new Promise((resolve, reject) => {
      shopMark(state.user_token, datas).then(response => {
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
