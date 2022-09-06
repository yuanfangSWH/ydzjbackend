import request from '@/utils/request'

// 充值记录
function rechargeList(params) {
  return request({
    url: '/appuser/recharge/list',
    method: 'get',
    params: params
  })
}
// 提现列表
function cashList(params) {
  return request({
    url: '/appuser/cash/list',
    method: 'get',
    params: params
  })
}
//人工审核提现
function cashMention(data) {
  return request({
    url: '/appuser/cash/agreeCash',
    method: 'post',
    data
  })
}
// Y币变动日志
function YcurrencyDetail(params) {
  return request({
    url: '/appuser/currencyDetail/list',
    method: 'get',
    params: params
  })
}
// D币变动日志
function DincomeDetail(params) {
  return request({
    url: '/appuser/incomeDetail/list',
    method: 'get',
    params: params
  })
}
export default {
  rechargeList,
  cashList,
  cashMention,
  YcurrencyDetail,
  DincomeDetail
}
