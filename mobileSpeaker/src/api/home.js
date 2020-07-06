import request from '@/utils/request'
// 首页

// 名师推荐列表
export function teacherRecommendList (data) {
  return request({
    url: '/teacher/teacher-list/',
    method: 'get',
    data: data
  })
}

// 课程推荐列表
export function courseRecommendList (data) {
  return request({
    url: '/course/courses-list/',
    method: 'get',
    data: data
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
