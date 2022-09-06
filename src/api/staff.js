import request from '@/utils/request'

// 部门列表
function deptList(params) {
  return request({
    url: '/staff/dept/list',
    method: 'get',
    params
  })
}
// 添加部门
function deptInsert(data) {
  return request({
    url: '/staff/dept/insert',
    method: 'post',
    data
  })
}
// 修改部门
function deptUpdate(data) {
  return request({
    url: '/staff/dept/update',
    method: 'post',
    data
  })
}
// 删除部门
function deptDelete(data) {
  return request({
    url: '/staff/dept/delete',
    method: 'post',
    data
  })
}

//setSort修改排序 
function deptSetSort(data) {
  return request({
    url: '/staff/dept/setSort',
    method: 'post',
    data
  })
}

//角色列表
function juesList(params) {
  return request({
    url: '/staff/role/list',
    method: 'get',
    params
  })
}
// 添加角色
function juesInsert(data) {
  return request({
    url: '/staff/role/insert',
    method: 'post',
    data
  })
}
// 修改角色
function juesUpdate(data) {
  return request({
    url: '/staff/role/update',
    method: 'post',
    data
  })
}
// 删除角色
function juesDelete(data) {
  return request({
    url: '/staff/role/delete',
    method: 'post',
    data
  })
}
// 权限菜单树型
function menuAllTree() {
  return request({
    url: '/staff/menu/allTree',
    method: 'get'
  })
}
// 查询角色所拥有的权限菜单树型
function RoleMenuIDList(params) {
  return request({
    url: '/staff/role/roleMenuIDList/',
    method: 'get',
    params
  })
}
// 修改保存角色的权限菜单
function setRoleMenu(data) {
  return request({
    url: '/staff/role/setRoleMenu',
    method: 'post',
    data
  })
}
/* 员工菜单 */
function staffMenu(params) {
  return request({
    url: '/staff/menu/',
    method: 'get',
    params: params
  })
}
// 员工列表
function userList(params) {
  return request({
    url: '/staff/user/list',
    method: 'get',
    params
  })
}
// 添加员工
function userInsert(data) {
  return request({
    url: '/staff/user/insert',
    method: 'post',
    data
  })
}
// 修改员工
function userUpdate(data) {
  return request({
    url: '/staff/user/update',
    method: 'post',
    data
  })
}
// 修改员工查询
function userDetail(params) {
  return request({
    url: '/staff/user/detail',
    method: 'get',
    params
  })
}
// 删除员工
function userDelete(data) {
  return request({
    url: '/staff/user/delete',
    method: 'post',
    data
  })
}
//还原员工
function userRecovery(data) {
  return request({
    url: '/staff/user/recovery',
    method: 'post',
    data
  })
}
export default {
  userList,
  userDelete,
  userRecovery,
  userInsert,
  userUpdate,
  userDetail,
  deptList,
  deptInsert,
  deptUpdate,
  deptDelete,
  deptSetSort,
  menuAllTree,
  RoleMenuIDList,
  juesList,
  juesInsert,
  juesUpdate,
  juesDelete,
  setRoleMenu,
  staffMenu
}
