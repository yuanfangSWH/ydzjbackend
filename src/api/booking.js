/*
 * @Author: your name
 * @Date: 2021-01-21 18:19:20
 * @LastEditTime: 2021-02-04 13:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\api\booking.js
 */
import request from '@/utils/request'

// 预订列表
function ReserveList(params) {
  return request({
    url: '/reserve/manage/reserveList',
    method: 'get',
    params: params
  })
}
// 预订详情
function ReserveDetail(params) {
  return request({
    url: '/reserve/manage/reserveDetail',
    method: 'get',
    params: params
  })
}
// 退款处理
function RefuseAudit(data) {
  return request({
    url: '/reserve/manage/refuseAudit',
    method: 'post',
    data
  })
}
//商家取消预订
function Cancel(data) {
  return request({
    url: '/reserve/manage/cancel',
    method: 'post',
    data
  })
}
//商家确认预订
function Confirm(data) {
  return request({
    url: '/reserve/manage/confirm',
    method: 'post',
    data
  })
}
//获取通知
function getNotify(params) {
  return request({
    url: '/notify/getNotify',
    method: 'get',
    params
  })
}
//确认取消
function confirmCancel(data) {
  return request({
    url: '/reserve/manage/confirmCancel',
    method: 'post',
    data
  })
}
//核销订单
function checkReserver(data) {
  return request({
    url: '/reserve/manage/check',
    method: 'post',
    data
  })
}
export default {
  ReserveList,
  ReserveDetail,
  RefuseAudit,
  Cancel,
  Confirm,
  getNotify,
  confirmCancel,
  checkReserver
}
