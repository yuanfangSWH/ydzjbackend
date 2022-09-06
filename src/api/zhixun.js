/*
 * @Author: your name
 * @Date: 2021-03-12 12:28:14
 * @LastEditTime: 2021-03-16 15:51:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * 
 * @FilePath: \ydzjbackend\src\api\zhixun.js
 */
import request from '@/utils/request'
// 全部资讯分类
function getListclass(params) {
  return request({
    url: '/news/content/listclass',
    method: 'get',
    params
  })
}
//资讯列表
function getNews(params) {
  return request({
    url: '/news/content/list',
    method: 'get',
    params
  })
}
// 添加资讯
function insertZX(data) {
  return request({
    url: '/news/content/insert',
    method: 'post',
    data
  })
}
//编辑资讯
function newsUpdate(data) {
  return request({
    url: '/news/content/update',
    method: 'post',
    data
  })
}
// 编辑资讯分类
function updateclass(data) {
  return request({
    url: '/news/content/updateclass',
    method: 'post',
    data
  })
}
// 查店铺
function getShop(params) {
  return request({
    url: '/news/content/shop',
    method: 'get',
    params
  })
}
//资讯媒体库分类
function Listclass(params) {
  return request({
    url: '/news/content/media/listclass',
    method: 'get',
    params
  })
}
//资讯素材库列表
function Listmedia(params) {
  return request({
    url: '/news/content/media/list',
    method: 'get',
    params
  })
}

//添加分类 /news/content/media/insertclass
function newsMediaInsertClass(data) {
  return request({
    url: '/news/content/media/insertclass',
    method: 'post',
    data
  })
}
//修改分类 /news/content/media/setclass
function newsMediaUpdateClass(data) {
  return request({
    url: '/news/content/media/setclass',
    method: 'post',
    data
  })
}
//删除分类 /news/content/media/deleteclass
function newsMediaDeleteClass(data) {
  return request({
    url: '/news/content/media/deleteclass',
    method: 'post',
    data
  })
}
//添加媒体 /news/content/media/insert
function newsMediaInsert(data) {
  return request({
    url: '/news/content/media/insert',
    method: 'post',
    data
  })
}
//修改媒体 /news/content/media/update
function newsMediaUpdate(data) {
  return request({
    url: '/news/content/media/update',
    method: 'post',
    data
  })
}
//删除媒体 /news/content/media/delete
function newsMediaDelete(data) {
  return request({
    url: '/news/content/media/delete',
    method: 'post',
    data
  })
}
export default {
  getNews,
  getListclass,
  insertZX,
  newsUpdate,
  getShop,
  updateclass,
  Listclass,
  Listmedia,
  newsMediaInsertClass,
  newsMediaUpdateClass,
  newsMediaDeleteClass,
  newsMediaInsert,
  newsMediaUpdate,
  newsMediaDelete
}
