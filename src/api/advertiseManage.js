import request from '@/utils/request'
// 广告位列表
function advertiseList(params) {
  return request({
    url: '/pubs/publicize/list',
    method: 'get',
    params: params
  })
}
// 详情
function advertiseDetail(params) {
  return request({
    url: '/pubs/publicize/detail',
    method: 'get',
    params: params
  })
}

function delAdvertise(data) {
  return request({
    url: '/pubs/publicize/delete',
    method: 'post',
    data
  })
}

function addAdvertise(data) {
  return request({
    url: '/pubs/publicize/insert',
    method: 'post',
    data
  })
}
// 编辑
function editAdvertise(data) {
  return request({
    url: '/pubs/publicize/update',
    method: 'post',
    data
  })
}
// 还原
function handleRestore(data) {
  return request({
    url: '/pubs/publicize/recovery',
    method: 'post',
    data
  })
}
// 彻底删除
function handleDelete(data) {
  return request({
    url: '/pubs/publicize/realDelete',
    method: 'post',
    data
  })
}
//排序
function handleSort(data) {
  return request({
    url: '/pubs/publicize/setSort',
    method: 'post',
    data
  })
}
//广告位排序
function advPlaceSort(data) {
  return request({
    url: '/pubs/pos/setSort',
    method: 'post',
    data
  })
}
export default {
  advertiseList,
  advertiseDetail,
  delAdvertise,
  addAdvertise,
  editAdvertise,
  handleRestore,
  handleDelete,
  handleSort,
  advPlaceSort
}
