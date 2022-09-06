import request from '@/utils/request'
// 广告位列表
function adPlaceList(params) {
  return request({
    url: '/pubs/pos/list',
    method: 'get',
    params: params
  })
}
// 详情
function adPlaceDetail(params) {
  return request({
    url: '/pubs/pos/detail',
    method: 'get',
    params: params
  })
}

function delAdPlace(data) {
  return request({
    url: '/pubs/pos/delete',
    method: 'post',
    data
  })
}

function addAdPlace(data) {
  return request({
    url: '/pubs/pos/insert',
    method: 'post',
    data
  })
}

function editAdPlace(data) {
  return request({
    url: '/pubs/pos/update',
    method: 'post',
    data
  })
}
// 还原
function handleRestore(data) {
  return request({
    url: '/pubs/pos/recovery',
    method: 'post',
    data
  })
}
// 彻底删除
function handleDelete(data) {
  return request({
    url: '/pubs/pos/realDelete',
    method: 'post',
    data
  })
}
export default {
  adPlaceList,
  adPlaceDetail,
  delAdPlace,
  addAdPlace,
  editAdPlace,
  handleRestore,
  handleDelete
}
