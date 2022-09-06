import request from '@/utils/request'

// 项目配置列表
function configList(params) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params
  })
}
// 项目配置修改
function configUpdate(data) {
  return request({
    url: '/system/config/update',
    method: 'post',
    data
  })
}
// 项目配置分类列表
function configCategory(params) {
  return request({
    url: '/system/config/category',
    method: 'get',
    params
  })
}
//IOS充值设置列表
function rechargeList(params) {
  return request({
    url: '/system/config/recharge/',
    method: 'get',
    params
  })
}
//IOS充值设置添加
function rechargeInsert(data) {
  return request({
    url: '/system/config/recharge/insert',
    method: 'post',
    data
  })
}
//IOS充值设置修改
function rechargeUpdate(data) {
  return request({
    url: '/system/config/recharge/update',
    method: 'post',
    data
  })
}
//IOS充值设置删除
function rechargeDelete(data) {
  return request({
    url: '/system/config/recharge/delete',
    method: 'post',
    data
  })
}
//错误日志列表
function ErrorList(params) {
  return request({
    url: '/system/error/list',
    method: 'get',
    params
  })
}
//错误日志详情
function ErrorDetail(data) {
  return request({
    url: '/systemError/detail',
    method: 'post',
    data
  })
}

//操作日志列表
function AdminLog(params) {
  return request({
    url: '/system/adminlog/list',
    method: 'get',
    params
  })
}
//操作日志详情
function AdminLogDetail(params) {
  return request({
    url: '/system/adminlog/detail',
    method: 'get',
    params
  })
}
//管理登录列表
function AdminLogin(params) {
  return request({
    url: '/log/adminLogin/list',
    method: 'get',
    params
  })
}
//管理登录详情
function AdminLoginDetail(params) {
  return request({
    url: '/log/adminLog/detail',
    method: 'get',
    params
  })
}
//用户登录列表
function UserLogin(params) {
  return request({
    url: '/log/userLogin/list',
    method: 'get',
    params
  })
}
//用户登录详情
function UserLoginDetail(params) {
  return request({
    url: '/log/userLogin/detail',
    method: 'get',
    params
  })
}
//广播推送列表
function SystemPush(params) {
  return request({
    url: '/system/push/list',
    method: 'get',
    params
  })
}
//新增广播推送
function SystemPushInsert(data) {
  return request({
    url: '/system/push/insert',
    method: 'post',
    data
  })
}
//ip地址查询
function IpSearch(params) {
  return request({
    url: '/ip/search/',
    method: 'get',
    params
  })
}
//定向推送列表
function systemTarget(params) {
  return request({
    url: '/system/target/list',
    method: 'get',
    params
  })
}
//新增定向推送
function SystemTargetInsert(data) {
  return request({
    url: '/system/target/insert',
    method: 'post',
    data
  })
}
export default {
  configList,
  configUpdate,
  configCategory,
  rechargeList,
  rechargeInsert,
  rechargeUpdate,
  rechargeDelete,
  ErrorList,
  ErrorDetail,
  AdminLog,
  AdminLogDetail,
  AdminLogin,
  AdminLoginDetail,
  UserLogin,
  UserLoginDetail,
  SystemPush,
  SystemPushInsert,
  IpSearch,
  systemTarget,
  SystemTargetInsert
}
