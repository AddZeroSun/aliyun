import request from '@/utils/request'
// 名师管理

// 名师列表
export function teacherList(params) {
  return request({
    url: '/teacher/teacher-list/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    params: params
  })
}

// 添加名师
export function createTeacher(data) {
  return request({
    url: '/teacher/add-teacher/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 编辑名师
export function editTeacher(data) {
  return request({
    url: '/teacher/edit-teacher/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 名师详情
export function teacherDetail(params) {
  return request({
    url: '/teacher/teacher-detail',
    method: 'get',
    params: params
  })
}

// 上传名师图片
export function uploadTeacherImage(data) {
  return request({
    url: '/upload-pic/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
