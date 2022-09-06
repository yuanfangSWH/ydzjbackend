import request from '@/utils/request'

// 获取商品分类
export function getGoodsClass(token, params) {
  return request({
    url: '/goods/class/list',
    method: 'get',
    params
  })
}

// 获取商品分类详情
export function getGoodsClassDetail(token, params) {
  return request({
    url: '/goods/class/detail',
    method: 'get',
    params: {
      'id': params
    }
  })
}

// 新增商品分类
export function addGoodsClass(token, data) {
  return request({
    url: '/goods/class/insert',
    method: 'post',
    data
  })
}

// 删除商品分类
export function deleteGoodsClass(token, data) {
  return request({
    url: '/goods/class/delete',
    method: 'post',
    data
  })
}
// 删除商品分类(废弃)
export function deleteGoodsClassWSY(token, data) {
  return request({
    url: '/goods/class/delete',
    method: 'post',
    data
  })
}
// 编辑商品分类
export function updateGoodsClass(token, data) {
  return request({
    url: '/goods/class/update',
    method: 'post',
    data
  })
}

// 获取商品列表
export function getGoodsList(token, params) {
  return request({
    url: '/goods/goods/list',
    method: 'get',
    params
  })
}

// 获取商品详情
export function getGoodsDetail(token, params) {
  return request({
    url: '/goods/goods/detail',
    method: 'get',
    params
  })
}

// 编辑商品
export function updateGoods(token, data) {
  return request({
    url: '/goods/goods/update',
    method: 'post',
    data
  })
}

// 删除商品
export function deleteGoods(token, data) {
  return request({
    url: '/goods/goods/delete',
    method: 'post',
    data
  })
}

// 新增商品
export function addGoods(token, data) {
  return request({
    url: '/goods/goods/insert',
    method: 'post',
    data
  })
}

// 获取团购套餐列表
export function getGroupBuyList(token, params) {
  return request({
    url: '/goods/groupbuy/list',
    method: 'get',
    params
  })
}

// 获取团购套餐详情
export function getGroupBuyDetail(token, params) {
  return request({
    url: '/goods/groupbuy/detail',
    method: 'get',
    params
  })
}

// 编辑团购套餐
export function updateGroupBuy(token, data) {
  return request({
    url: '/goods/groupbuy/update',
    method: 'post',
    data
  })
}

// 删除团购套餐
export function deleteGroupBuy(token, data) {
  return request({
    url: '/goods/groupbuy/delete',
    method: 'post',
    data
  })
}

// 新增团购套餐
export function addGroupBuy(token, data) {
  return request({
    url: '/goods/groupbuy/insert',
    method: 'post',
    data
  })
}

// 添加套餐组合输入关键字快速匹配
export function getGroupBuySelectGoods(token, params) {
  return request({
    url: '/goods/groupbuy/selectGoods',
    method: 'get',
    params
  })
}

//商品上下
export function goodsUpDown(token, data) {
  return request({
    url: '/goods/goods/upDown',
    method: 'post',
    data
  })
}

//套餐上下架
function groupUpDown(data) {
  return request({
    url: '/goods/groupbuy/isEnable',
    method: 'post',
    data
  })
}

//商品排序设置
function goodsSetSort(data) {
  return request({
    url: '/goods/goods/setSort',
    method: 'post',
    data
  })
}

//修改商品分类排序
function goodsClassSetSort(data) {
  return request({
    url: '/goods/class/setSort',
    method: 'post',
    data
  })
}

//物理删除分类 /goods/class/realDelete
function goodsClassRealDelete(data) {
  return request({
    url: '/goods/class/realDelete',
    method: 'post',
    data
  })
}

export default {
  groupUpDown,
  goodsSetSort,
  goodsClassSetSort,
  goodsClassRealDelete
}
