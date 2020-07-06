import request from '@/utils/request'
// 管理员列表
export function adminList(params) {
  return request({
    url: '/admin/admin-list',
    method: 'get',
    params: params
  })
}
// 添加管理员
export function addAdmin(data) {
  return request({
    url: '/admin/add-admin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 修改管理员
export function editAdmin(data) {
  return request({
    url: '/admin/edit-admin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 管理员权限验证
export function checkAdminAuth(data) {
  return request({
    url: '/admin/check-admin-auth',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
