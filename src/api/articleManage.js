import request from '@/utils/request'
// 文章列表
function articleList(params) {
  return request({
    url: '/article/set/list',
    method: 'get',
    params
  })
}
function articleDetail(params) {
  return request({
    url: '/article/set/detail',
    method: 'get',
    params
  })
}
function delArticle(data) {
  return request({
    url: '/article/set/delete',
    method: 'post',
    data
  })
}
function realDelArticle(data) {
  return request({
    url: '/article/set/realDelete',
    method: 'post',
    data
  })
}
function recoveryArticle(data) {
  return request({
    url: '/article/set/recovery',
    method: 'post',
    data
  })
}
function addArticle(data) {
  return request({
    url: '/article/set/insert',
    method: 'post',
    data
  })
}
function uploadsImage(data) {
  return request({
    url: '/file/uploads',
    method: 'post',
    data
  })
}
function editArticle(data) {
  return request({
    url: '/article/set/update',
    method: 'post',
    data
  })
}
export default {
  articleList,
  articleDetail,
  delArticle,
  realDelArticle,
  addArticle,
  uploadsImage,
  editArticle,
  recoveryArticle
}