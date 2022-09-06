import request from '@/utils/request'

// 获取礼物数据
function ListData(params) {
  return request({
    url: '/gift/list',
    method: 'get',
    params: params
  })
}
// 礼物添加
function GiftInsert(data) {
  return request({
    url: '/gift/insert',
    method: 'post',
    data
  })
}
// 礼物修改
function GiftUpdate(data) {
  return request({
    url: '/gift/update',
    method: 'post',
    data
  })
}
// 礼物下架
function GiftDelete(data) {
  return request({
    url: '/gift/delete',
    method: 'post',
    data
  })
}
// 礼物上架
function GiftRecovery(data) {
  return request({
    url: '/gift/recovery',
    method: 'post',
    data
  })
}
//礼物购买记录
function HistoryData(params) {
  return request({
    url: '/gift/history',
    method: 'get',
    params: params
  })
}
// 礼物排序设置
function GiftsetSort(data) {
  return request({
    url: '/gift/setSort',
    method: 'post',
    data
  })
}

//纠错商家列表
function getshopCorrect(params) {
  return request({
    url: '/report/shopCorrect/list',
    method: 'get',
    params: params
  })
}
//纠错删除
function deletedshopCorrect(data) {
  return request({
    url: '/report/shopCorrect/delete',
    method: 'post',
    data
  })
}
// 纠错处理
function gethandling(data) {
  return request({
    url: '/report/shopCorrect/handling',
    method: 'post',
    data
  })
}

export default {
  ListData,
  GiftInsert,
  GiftUpdate,
  GiftDelete,
  HistoryData,
  GiftRecovery,
  GiftsetSort,
  getshopCorrect,
  deletedshopCorrect,
  gethandling,
}
