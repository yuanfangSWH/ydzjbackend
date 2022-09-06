import request from '@/utils/request'

// 获取菜单信息（权限）
export function getStaffmenu() {
  return request({
    url: '/api/staff/menu/',
    method: 'get'
  })
}

