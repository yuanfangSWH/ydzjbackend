import request from '@/utils/request'

// 获取预订订单列表
function getReserveList(params) {
  return request({
    url: '/reserve/manage/reserveList',
    method: 'get',
    params
  })
}
// 获取团购订单列表
function getGroupBuyList(params) {
  return request({
    url: '/reserve/manage/groupBuyList/',
    method: 'get',
    params
  })
}
// 获取账单订单列表
function getBillList(params) {
  return request({
    url: '/reserve/manage/billList/',
    method: 'get',
    params
  })
}
// 商家帮预定
function submitReserve(data) {
  return request({
    url: '/reserve/manage/submit',
    method: 'post',
    data
  })
}
// 预订排队叫号
function updateQueue(data) {
  return request({
    url: '/reserve/queue/update',
    method: 'post',
    data
  })
}
// 获取预定排队列表
function getQueueList(params) {
  return request({
    url: '/reserve/queue/',
    method: 'get',
    params
  })
}
// 获取预订订单详情
function getReserveDetail(params) {
  return request({
    url: '/reserve/manage/reserveDetail/',
    method: 'get',
    params
  })
}
//商家确认预订
function confirmReserve(data) {
  return request({
    url: '/reserve/manage/confirm',
    method: 'post',
    data
  })
}
//商家取消预订
function cancelReserver(data) {
  return request({
    url: '/reserve/manage/cancel',
    method: 'post',
    data
  })
}
// 获取团购订单详情
function getGroupBuyDetail(params) {
  return request({
    url: '/reserve/manage/groupBuyDetail/',
    method: 'get',
    params
  })
}
// 获取消费账单订单详情
function getBillDetail(params) {
  return request({
    url: '/reserve/manage/billDetail/',
    method: 'get',
    params
  })
}
export default {
  getReserveList,
  getGroupBuyList,
  getBillList,
  submitReserve,
  updateQueue,
  getQueueList,
  getReserveDetail,
  confirmReserve,
  cancelReserver,
  getGroupBuyDetail,
  getBillDetail
}