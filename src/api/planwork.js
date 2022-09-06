import request from '@/utils/request'

// 列表
function planListData(params) {
  return request({
    url: '/cronWorker/list',
    method: 'get',
    params: params
  })
}

//添加
function addPlan(data) {
  return request({
    url: '/cronWorker/insert',
    method: 'post',
    data
  })
}

// 详情
function planDetail(params) {
  return request({
    url: '/cronWorker/detail',
    method: 'get',
    params: params
  })
}

//编辑
function updatePlan(data) {
  return request({
    url: '/cronWorker/update',
    method: 'post',
    data
  })
}

//删除
function deletePlan(data) {
  return request({
    url: '/cronWorker/delete',
    method: 'post',
    data
  })
}
//立即执行
function runningPlan(data) {
  return request({
    url: '/cronWorker/running',
    method: 'post',
    data
  })
}
export default {
  planListData,
  addPlan,
  planDetail,
  updatePlan,
  deletePlan,
  runningPlan
}