import request from '@/utils/request'

// 商品图库分类列表
function goodsListClass(params) {
  return request({
    url: '/goods/media/listclass',
    method: 'get',
    params: params
  })
}

// 添加商品图库分类
function picInsertClass(data) {
  return request({
    url: '/goods/media/insertclass',
    method: 'post',
    data
  })
}
// 删除商品图库分类
function picDeleteClass(data) {
  return request({
    url: '/goods/media/deleteclass',
    method: 'post',
    data
  })
}
// 编辑商品图库分类
function picSetClass(data) {
  return request({
    url: '/goods/media/setclass',
    method: 'post',
    data
  })
}
// 商品图库列表
function pictureList(params) {
  return request({
    url: '/goods/media/list',
    method: 'get',
    params: params
  })
}
// 删除商品图
function pictureDelete(data) {
  return request({
    url: '/goods/media/delete',
    method: 'post',
    data
  })
}
// 添加商品图库
function pictureInsert(data) {
  return request({
    url: '/goods/media/insert',
    method: 'post',
    data
  })
}
// 更新商品图片库
function pictureUpdate(data) {
  return request({
    url: '/goods/media/update',
    method: 'post',
    data
  })
}
export default {
  goodsListClass,
  picInsertClass,
  picDeleteClass,
  picSetClass,
  pictureList,
  pictureDelete,
  pictureInsert,
  pictureUpdate
}