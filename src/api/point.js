/*
 * @Author: your name
 * @Date: 2021-04-01 14:10:56
 * @LastEditTime: 2021-04-08 14:33:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\api\point.js
 */
import request from '@/utils/request'

// 积分列表
function pointLogList(params) {
  return request({
    url: '/point/log/list',
    method: 'get',
    params: params
  })
}
//商城列表
function pointMallList(params) {
  return request({
    url: '/point/mall/list',
    method: 'get',
    params: params
  })
}
//商城修改商品
function pointMallUpdate(data) {
  return request({
    url: '/point/mall/update',
    method: 'post',
    data
  })
}
//商城增加商品
function pointMallInsert(data) {
  return request({
    url: '/point/mall/insert',
    method: 'post',
    data
  })
}
//商城商品上下架
function pointMallUpDown(data) {
  return request({
    url: '/point/mall/updown',
    method: 'post',
    data
  })
}
//商城商品删除
function pointMallDelete(data) {
  return request({
    url: '/point/mall/delete',
    method: 'post',
    data
  })
}

//商城列表
function pointExchangeList(params) {
  return request({
    url: '/point/exchange/list',
    method: 'get',
    params: params
  })
}

//添加物流信息
function pointExchangeUpdate(data) {
  return request({
    url: '/point/exchange/update',
    method: 'post',
    data
  })
}
export default {
  pointLogList,

  pointMallList,
  pointMallUpdate,
  pointMallInsert,
  pointMallUpDown,
  pointMallDelete,

  pointExchangeList,
  pointExchangeUpdate
}
