import request from '@/utils/request'

// 列表 
function invitation(params) {
  return request({
    url: '/activity/invitation/list',
    method: 'get',
    params: params
  })
}
// 详情
function invitationDetail(params) {
  return request({
    url: '/activity/userdetail',
    method: 'get',
    params: params
  })
}
// 活动用户
function activityList(params) {
  return request({
    url: '/activity/user',
    method: 'get',
    params: params
  })
}
export default {
  invitation,
  invitationDetail,
  activityList,
}
