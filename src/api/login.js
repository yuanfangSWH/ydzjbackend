import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/account',
    method: 'post',
    data
  })
}
// 重置密码
export function resetPsw(data) {
  return request({
    url: '/login/forget',
    method: 'post',
    data
  })
}
// 手机登录
export function phoneLogin(data) {
  return request({
    url: '/login/phonelogin',
    method: 'post',
    data
  })
}
// 获取手机验证码--登录
export function getCaptcha(data) {
  return request({
    url: '/sms/send',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo(token) {
  return request({
    url: '/admin/info/',
    method: 'get',
    params: { token }
  })
}
// 退出
export function logout() {
  return request({
    url: '/login/logout',
    method: 'get'
  })
}
// 获取导航所有菜单
export function getStaffmenu() {
  return request({
    url: '/staff/menu/allmenu',
    method: 'get'
  })
}
// 获取导航所有菜单
export function getStaffInfo() {
  return request({
    url: '/staff/menu/info',
    method: 'get'
  })
}

