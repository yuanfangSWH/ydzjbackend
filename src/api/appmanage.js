import request from '@/utils/request'

// app列表
function appListData(params) {
  return request({
    url: '/app/client/list',
    method: 'get',
    params: params
  })
}

//添加
function addApp(data) {
  return request({
    url: '/app/client/insert',
    method: 'post',
    data
  })
}

// app详情
function appDetail(params) {
  return request({
    url: '/app/client/detail',
    method: 'get',
    params: params
  })
}

//添加
function updateApp(data) {
  return request({
    url: '/app/client/update',
    method: 'post',
    data
  })
}

//删除
function deleteApp(data) {
  return request({
    url: '/app/client/delete',
    method: 'post',
    data
  })
}

// 还原
function recoveryApp(data) {
  return request({
    url: '/app/client/recovery',
    method: 'post',
    data
  })
}

// 彻底删除
function realDeleteApp(data) {
  return request({
    url: '/app/client/realDelete',
    method: 'post',
    data
  })
}

// button列表
function buttonListData(params) {
  return request({
    url: '/app/button/list',
    method: 'get',
    params: params
  })
}
// button详情
function buttonDetail(params) {
  return request({
    url: '/app/button/detail',
    method: 'get',
    params: params
  })
}
//button删除
function deleteButton(data) {
  return request({
    url: '/app/button/delete',
    method: 'post',
    data
  })
}
//button编辑
function updateButton(data) {
  return request({
    url: '/app/button/update',
    method: 'post',
    data
  })
}
//button添加
function insertButton(data) {
  return request({
    url: '/app/button/insert',
    method: 'post',
    data
  })
}
// 还原
function recoveryButton(data) {
  return request({
    url: '/app/button/recovery',
    method: 'post',
    data
  })
}
// 彻底删除
function realDeleteButton(data) {
  return request({
    url: '/app/button/realDelete',
    method: 'post',
    data
  })
}

// 获取上传令牌
function getuploadFile(data) {
  return request({
    url: '/file/uploadFile',
    method: 'post',
    data
  })
}
//  
function getfileSts(params) {
  return request({
    url: '/file/sts',
    method: 'get',
    params: params,
  })
}
// 意见反馈
function feedbackList(params) {
  return request({
    url: '/app/feedback/list',
    method: 'get',
    params: params,
  })
}
// 处理意见反馈
function checkFeedback(data) {
  return request({
    url: '/app/feedback/handle',
    method: 'post',
    data
  })
}
export default {
  appListData,
  addApp,
  appDetail,
  updateApp,
  deleteApp,
  buttonListData,
  buttonDetail,
  deleteButton,
  updateButton,
  insertButton,
  recoveryApp,
  recoveryButton,
  realDeleteApp,
  realDeleteButton,
  getuploadFile,
  getfileSts,
  feedbackList,
  checkFeedback
}
