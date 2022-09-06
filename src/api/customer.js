import request from '@/utils/request'

// 获取顾客数据
function customerData(params) {
  return request({
    url: '/customer/',
    method: 'get',
    params: params
  })
}
//顾客详情
function customerDetail(params) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params: params
  })
}
export default {
  customerData,
  customerDetail
}