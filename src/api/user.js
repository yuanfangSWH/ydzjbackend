import request from '@/utils/request'

// 用户信息
function getUser(params) {
  return request({
    url: '/appuser/user/list',
    method: 'get',
    params
  })
}
// 用户详情
function UserDetail(params) {
  return request({
    url: '/appuser/user/detail',
    method: 'get',
    params
  })
}
// 二维码查询用户详情
function UserQrCode(params) {
  return request({
    url: '/appuser/user/qrCode/',
    method: 'get',
    params
  })
}
// 批量修改用户的状态
function UserHandle(data) {
  return request({
    url: '/appuser/user/handle',
    method: 'post',
    data
  })
}
//用户职业列表
function Professional(params) {
  return request({
    url: '/appuser/industry/list',
    method: 'get',
    params
  })
}
//用户职业添加
function ZhiInsert(data) {
  return request({
    url: '/appuser/industry/insert',
    method: 'post',
    data
  })
}
//用户职业修改
function ZhiUpdate(data) {
  return request({
    url: '/appuser/industry/update',
    method: 'post',
    data
  })
}
//用户职业删除
function ZhiDelete(data) {
  return request({
    url: '/appuser/industry/delete',
    method: 'post',
    data
  })
}
//用户标签列表
function BqTag(params) {
  return request({
    url: '/appuser/tag/list',
    method: 'get',
    params
  })
}
//用户标签添加
function BqInsert(data) {
  return request({
    url: '/appuser/tag/insert',
    method: 'post',
    data
  })
}
//用户标签修改
function BqUpdate(data) {
  return request({
    url: '/appuser/tag/update',
    method: 'post',
    data
  })
}
//用户标签删除
function BqDelete(data) {
  return request({
    url: '/appuser/tag/delete',
    method: 'post',
    data
  })
}
//用户评论列表
function UserEvaluate(params) {
  return request({
    url: '/appuser/evaluate/list',
    method: 'get',
    params
  })
}
//评论审核
function EvaluateHandle(data) {
  return request({
    url: '/appuser/evaluate/handle',
    method: 'post',
    data
  })
}
//举报记录列表
function getReport(params) {
  return request({
    url: '/appuser/report/list',
    method: 'get',
    params
  })
}
//举报记录详情
function ReportDetail(params) {
  return request({
    url: '/appuser/report/detail',
    method: 'get',
    params
  })
}
//评论审核
function ReportHandle(data) {
  return request({
    url: '/api/appuser/report/handle',
    method: 'post',
    data
  })
}
//用户账单记录
function UserBill(params) {
  return request({
    url: '/appuser/bill/list',
    method: 'get',
    params
  })
}
//用户退款记录
function UserRefund(params) {
  return request({
    url: '/appuser/refund/list',
    method: 'get',
    params
  })
}
//用户预订记录
function UserReserve(params) {
  return request({
    url: '/appuser/reserve/list',
    method: 'get',
    params
  })
}
//用户礼物信息
function GiftList(params) {
  return request({
    url: '/gift/userGift',
    method: 'get',
    params
  })
}
//用户标签
function TagList(params) {
  return request({
    url: '/appuser/tag/list',
    method: 'get',
    params
  })
}
//标签添加
function TagInsert(data) {
  return request({
    url: '/appuser/tag/insert',
    method: 'post',
    data
  })
}
//标签修改
function TagUpdate(data) {
  return request({
    url: '/appuser/tag/update',
    method: 'post',
    data
  })
}
//标签删除
function TagDelete(data) {
  return request({
    url: '/appuser/tag/delete',
    method: 'post',
    data
  })
}
//系统消息通知
function system(params) {
  return request({
    url: '/appuser/message/system',
    method: 'get',
    params
  })
}
//订单消息通知
function order(params) {
  return request({
    url: '/appuser/message/order',
    method: 'get',
    params
  })
}
//互动消息通知
function interact(params) {
  return request({
    url: '/appuser/message/interact',
    method: 'get',
    params
  })
}
//活动消息通知
function activity(params) {
  return request({
    url: '/appuser/message/activity',
    method: 'get',
    params
  })
}
//系统通知删除
function systemDelete(data) {
  return request({
    url: '/appuser/message/system/delete',
    method: 'post',
    data
  })
}
//订单通知删除
function orderDelete(data) {
  return request({
    url: '/appuser/message/order/delete',
    method: 'post',
    data
  })
}
//互动通知删除
function interactDelete(data) {
  return request({
    url: '/appuser/message/interact/delete',
    method: 'post',
    data
  })
}
//活动通知删除
function activityDelete(data) {
  return request({
    url: '/appuser/message/activity/delete',
    method: 'post',
    data
  })
}
//用户Y币记录
function Currency(params) {
  return request({
    url: '/appuser/user/currency',
    method: 'get',
    params
  })
}
//用户D币使用记录
function Income(params) {
  return request({
    url: '/appuser/user/income',
    method: 'get',
    params
  })
}

//用户导入列表
function UserImportList(params) {
  return request({
    url: '/appuser/import/list',
    method: 'get',
    params
  })
}
//用户添加进采集队列
function UserImportAdd(data) {
  return request({
    url: '/appuser/import/add',
    method: 'post',
    data
  })
}

function menuList(data) {
  return request({
    url: '/admin/menu/info',
    method: 'get',
    data
  })
}

//用户优惠券列表
function UserCoupon(params) {
  return request({
    url: '/appuser/user/coupon',
    method: 'get',
    params
  })
}

// function insertTag(data) {
//   return request({
//     url: '/appuser/tag/insert',
//     method: 'post',
//     data
//   })
// }
export default {
  getUser,
  UserDetail,
  UserQrCode,
  UserHandle,
  Professional,
  ZhiInsert,
  ZhiUpdate,
  ZhiDelete,
  BqTag,
  BqInsert,
  BqUpdate,
  BqDelete,
  UserEvaluate,
  EvaluateHandle,
  getReport,
  ReportDetail,
  ReportHandle,
  UserBill,
  UserRefund,
  UserReserve,
  GiftList,
  TagList,
  TagInsert,
  TagUpdate,
  TagDelete,
  system,
  order,
  interact,
  activity,
  systemDelete,
  orderDelete,
  interactDelete,
  activityDelete,
  Currency,
  Income,
  UserImportList,
  UserImportAdd,
  menuList,
  UserCoupon
}
