import request from '@/utils/request'

// 列表
function activityList(params) {
  return request({
    url: '/activity/list',
    method: 'get',
    params: params
  })
}
// 详情
function avtivityDetail(params) {
  return request({
    url: '/activity/detail',
    method: 'get',
    params: params
  })
}

//新增
function insertActivity(data) {
  return request({
    url: '/activity/insert',
    method: 'post',
    data
  })
}

//编辑
function updateActivity(data) {
  return request({
    url: '/activity/update',
    method: 'post',
    data
  })
}
//删除
function delActivity(data) {
  return request({
    url: '/activity/delete',
    method: 'post',
    data
  })
}
//恢复
function recoveryActivity(data) {
  return request({
    url: '/activity/recovery',
    method: 'post',
    data
  })
}

export default {
  activityList,
  insertActivity,
  avtivityDetail,
  updateActivity,
  delActivity,
  recoveryActivity
}
