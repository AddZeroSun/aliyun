import request from '@/utils/request'
// 首页

// 名师推荐列表
export function teacherRecommendList (params) {
  return request({
    url: '/teacher/teacher-list/',
    method: 'get',
    params: params
  })
}

// 课程推荐列表
export function courseRecommendList (params) {
  return request({
    url: '/course/courses-list/',
    method: 'get',
    params: params
  })
}

// 名师详情
export function teacherDetail (params) {
  return request({
    url: '/teacher/teacher-detail/',
    method: 'get',
    params: params
  })
}

// 课程详情
export function courseDetail (params) {
  return request({
    url: '/course/courses-detail/',
    method: 'get',
    params: params
  })
}

// 添加课程
export function createCourse (data) {
  return request({
    url: '/course/add-course/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}
