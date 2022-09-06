/*
 * @Author: your name
 * @Date: 2021-01-13 10:27:10
 * @LastEditTime: 2021-01-26 15:27:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ydzjbackend\src\api\overview.js
 */
import request from '@/utils/request'

//概览今日统计
function overviewCount() {
  return request({
    url: '/overview/count',
    method: 'get'
  })
}
//用户注册图表
function registerChart(params) {
  return request({
    url: '/overview/registerChart',
    method: 'get',
    params
  })
}
//用户充值图表
function rechargeChart(params) {
  return request({
    url: '/overview/rechargeChart',
    method: 'get',
    params
  })
}
//注册渠道Charts
function registerChannelChart(params) {
  return request({
    url: '/overview/registerChannelChart',
    method: 'get',
    params
  })
}
export default {
  overviewCount,
  registerChart,
  rechargeChart,
  registerChannelChart
}
