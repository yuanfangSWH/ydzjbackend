import request from '@/utils/request'

// 预定
function reserveList(params) {
  return request({
    url: '/record/reserve/chartsList',
    method: 'get',
    params: params
  })
}
function reserveCharts(params) {
  return request({
    url: '/record/reserve/charts',
    method: 'get',
    headers:{
      isCharts:true
     },
    params: params
  })
}

// 注册
function registerList(params) {
  return request({
    url: '/record/register/chartsList',
    method: 'get',
    params: params
  })
}
function registerCharts(params) {
  return request({
    url: '/record/register/charts',
    method: 'get',
    params: params
  })
}

// 充值
function rechargeList(params) {
  return request({
    url: '/record/recharge/chartsList',
    method: 'get',
    params: params
  })
}
function rechargeCharts(params) {
  return request({
    url: '/record/recharge/charts',
    method: 'get',
    params: params
  })
}
// 提现
function cashList(params) {
  return request({
    url: '/record/cash/chartsList',
    method: 'get',
    params: params
  })
}
function cashCharts(params) {
  return request({
    url: '/record/cash/charts',
    method: 'get',
    params: params
  })
}
// 组局
function groupPartyList(params) {
  return request({
    url: '/record/groupParty/chartsList',
    method: 'get',
    params: params
  })
}
function groupPartyCharts(params) {
  return request({
    url: '/record/groupParty/charts',
    method: 'get',
    params: params
  })
}
// 拼桌
function crowdfundingList(params) {
  return request({
    url: '/record/crowdfunding/chartsList',
    method: 'get',
    params: params
  })
}
function crowdfundingCharts(params) {
  return request({
    url: '/record/crowdfunding/charts',
    method: 'get',
    params: params
  })
}
// 优惠券
function couponList(params) {
  return request({
    url: '/record/coupon/chartsList',
    method: 'get',
    params: params
  })
}
function couponCharts(params) {
  return request({
    url: '/record/coupon/charts',
    method: 'get',
    params: params
  })
}
export default {
  reserveList,
  reserveCharts,
  registerList,
  registerCharts,
  rechargeList,
  rechargeCharts,
  cashList,
  cashCharts,
  groupPartyList,
  groupPartyCharts,
  crowdfundingList,
  crowdfundingCharts,
  couponList,
  couponCharts
}
