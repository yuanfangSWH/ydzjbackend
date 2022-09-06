import request from '@/utils/request'

// 列表
function reportList(params) {
  return request({
    url: '/report/list',
    method: 'get',
    params: params
  })
}
// 详情
function reportDetail(params) {
  return request({
    url: '/report/detail',
    method: 'get',
    params: params
  })
}

//审核
function auditReport(data) {
  return request({
    url: '/report/handling',
    method: 'post',
    data
  })
}
//删除
function delReport(data) {
  return request({
    url: '/report/delete',
    method: 'post',
    data
  })
}

export default {
  reportList,
  auditReport,
  reportDetail,
  delReport
}
