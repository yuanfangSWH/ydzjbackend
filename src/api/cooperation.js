import request from '@/utils/request'
// 获取营销数据
function shopList(params) {
  return request({
    url: '/cooperation/marketing/shop',
    method: 'get',
    params: params
  })
}
// 获取营销数据
function marketList(params) {
  return request({
    url: '/cooperation/marketing/list',
    method: 'get',
    params: params
  })
}
// 添加营销
function marketInsert(data) {
  return request({
    url: '/cooperation/marketing/insert',
    method: 'post',
    data
  })
}
// 更新营销
function marketUpdate(data) {
  return request({
    url: '/cooperation/marketing/update',
    method: 'post',
    data
  })
}
// 删除营销
function marketDelete(data) {
  return request({
    url: '/cooperation/marketing/delete',
    method: 'post',
    data
  })
}
// 营销备注
function marketMark(data) {
  return request({
    url: '/cooperation/marketing/mark',
    method: 'post',
    data
  })
}
// 广告合作列表
function pubsList(params) {
  return request({
    url: '/cooperation/pubs/list',
    method: 'get',
    params: params
  })
}
// 处理广告合作
function pubsHandle(data) {
  return request({
    url: '/cooperation/pubs/handle',
    method: 'post',
    data
  })
}
// 删除广告合作
function pubsDelete(data) {
  return request({
    url: '/cooperation/pubs/delete',
    method: 'post',
    data
  })
}
// 广告备注
function pubsMark(data) {
  return request({
    url: '/cooperation/pubs/mark',
    method: 'post',
    data
  })
}
export default {
  shopList,
  marketList,
  marketInsert,
  marketUpdate,
  marketDelete,
  marketMark,
  pubsList,
  pubsHandle,
  pubsDelete,
  pubsMark
}