import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.NODE_ENV == "development" ? '' : process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 1000 * 10 // request timeout
})

service.defaults.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded'
}

service.interceptors.request.use(
  config => {
    if (store.getters.x_token) {
      config.headers['AccessToken'] = getToken()
    }
    return config
  },
  error => {
    console.log('请求失败', error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 0 && res.code) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014 || res.code === 11002) {
        MessageBox.confirm('您已登出，请重新登录', '已登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('login/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return response
    }
  },
  error => {
    console.log('请求失败', error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
