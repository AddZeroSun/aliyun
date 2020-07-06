import request from '@/utils/request'
// 艺术家列表
export function artistList(params) {
  return request({
    url: '/artist/artist-list',
    method: 'get',
    params: params
  })
}
// 修改艺术家排序
export function editArtistSort(data) {
  return request({
    url: '/artist/edit-artist-sort',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 修改艺术家是否显示状态
export function editArtistShow(data) {
  return request({
    url: '/artist/edit-artist-show',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 修改艺术家置顶状态
export function editArtistStick(data) {
  return request({
    url: '/artist/edit-artist-stick',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 修改艺术家状态
export function editArtistStatus(data) {
  return request({
    url: '/artist/edit-artist-status',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}

// 添加名师
export function addArtist(data) {
  return request({
    url: '/artist/add-artist',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 修改艺术家
export function editArtist(data) {
  return request({
    url: '/artist/edit-artist',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 获取修改艺术家时的信息
export function getArtistInfo(params) {
  return request({
    url: '/artist/get-artist-info',
    method: 'get',
    params: params
  })
}
// 查看艺术家详情
export function artistDetail(params) {
  return request({
    url: '/artist/artist-detail',
    method: 'get',
    params: params
  })
}
// 上传艺术家图片
export function uploadArtistImage(data) {
  return request({
    url: '/artist/upload-artist-image',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
// 获取艺术家类型
export function getArtistType(params) {
  return request({
    url: '/artist/get-artist-type',
    method: 'get',
    params: params
  })
}
