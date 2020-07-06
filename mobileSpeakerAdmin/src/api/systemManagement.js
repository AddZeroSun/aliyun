import request from '@/utils/request'
// 系统管理

// 轮播图管理
// 轮播列表
export function bannerList(params) {
  return request({
    url: '/banner/banner-list/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    params: params
  })
}

// 添加轮播
export function addBanner(data) {
  return request({
    url: '/banner/add-banner/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 编辑轮播
export function editBanner(data) {
  return request({
    url: '/banner/edit-banner/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 轮播详情
export function bannerDetail(params) {
  return request({
    url: '/banner/banner-detail/',
    method: 'get',
    params: params
  })
}

// 单例删除轮播
export function bannerDelete(data) {
  return request({
    url: '/banner/banner-del/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 单例删除轮播
export function bannerBatchDelete(data) {
  return request({
    url: '/banner/banner-del/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 上传轮播图片
export function uploadBannerImage(data) {
  return request({
    url: '/upload-pic/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}

// 管理员管理
// 管理员列表
export function adminList(params) {
  return request({
    url: '/user/user-list/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    params: params
  })
}

// 添加管理员
export function addAdmin(data) {
  return request({
    url: '/user/register/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 修改管理员
export function editAdmin(data) {
  return request({
    url: '/user/edit-user/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 删除管理员
export function deleteAdmin(data) {
  return request({
    url: '/user/del-user/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 上传轮播图片
export function uploadAdminImage(data) {
  return request({
    url: '/upload-pic/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
