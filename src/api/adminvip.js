import request from '@/utils/request'

//部门数据List
function deptData(params) {
  return request({
    url: '/admin/dept/list',
    method: 'get',
    params: params
  })
}
// 部门添加
function deptInsert(data) {
  return request({
    url: '/admin/dept/insert',
    method: 'post',
    data
  })
}
// 部门修改
function deptUpdate(data) {
  return request({
    url: '/admin/dept/update',
    method: 'post',
    data
  })
}
// 部门删除
function deptDelete(data) {
  return request({
    url: '/admin/dept/delete',
    method: 'post',
    data
  })
}
//角色数据List
function roleData(params) {
  return request({
    url: '/admin/role/list',
    method: 'get',
    params: params
  })
}
// 角色添加
function roleInsert(data) {
  return request({
    url: '/admin/role/insert',
    method: 'post',
    data
  })
}
// 角色修改
function roleUpdate(data) {
  return request({
    url: '/admin/role/update',
    method: 'post',
    data
  })
}
// 角色权限修改
function roleQXUpdate(data) {
  return request({
    url: '/admin/role/setRoleMenu',
    method: 'post',
    data
  })
}
// 角色删除
function roleDelete(data) {
  return request({
    url: '/admin/role/delete',
    method: 'post',
    data
  })
}
// 权限菜单树型
function menuAllTree() {
  return request({
    url: '/admin/menu/allTree',
    method: 'get'
  })
}
// 查询角色所拥有的权限菜单树型
function RoleMenuIDList(params) {
  return request({
    url: '/admin/role/roleMenuIDList/',
    method: 'get',
    params
  })
}
// 修改保存角色的权限菜单
function setRoleMenu(data) {
  return request({
    url: '/admin/role/setRoleMenu',
    method: 'post',
    data
  })
}
//管理员数据List
function userData(params) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: params
  })
}
// 管理员添加
function userInsert(data) {
  return request({
    url: '/admin/user/insert',
    method: 'post',
    data
  })
}
// 管理员修改
function userUpdate(data) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data
  })
}
// 管理员删除
function userDelete(data) {
  return request({
    url: '/admin/user/delete',
    method: 'post',
    data
  })
}
// 管理员彻底删除
function realDelete(data) {
  return request({
    url: '/admin/user/realDelete',
    method: 'post',
    data
  })
}
// 管理员恢复
function glyRecovery(data) {
  return request({
    url: '/admin/user/recovery',
    method: 'post',
    data
  })
}
//管理员详情
function userDetail(params) {
  return request({
    url: '/admin/user/detail',
    method: 'get',
    params: params
  })
}
// 批量修改部门权限状态
function glybatchUpdate(data) {
  return request({
    url: '/admin/user/batchUpdate',
    method: 'post',
    data
  })
}
// 修改密码
function changePassword(data) {
  return request({
    url: '/admin/user/changePassword',
    method: 'post',
    data
  })
}
export default {
  deptData,
  deptInsert,
  deptUpdate,
  deptDelete,
  roleData,
  roleInsert,
  roleUpdate,
  roleDelete,
  menuAllTree,
  RoleMenuIDList,
  setRoleMenu,
  userData,
  userInsert,
  userUpdate,
  userDelete,
  userDetail,
  realDelete,
  glyRecovery,
  glybatchUpdate,
  roleQXUpdate,
  changePassword
}