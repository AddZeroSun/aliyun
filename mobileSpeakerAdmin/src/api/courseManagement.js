import request from '@/utils/request'
// 课程管理

// 课程列表
export function courseList(params) {
  return request({
    url: '/course/course-list/',
    method: 'get',
    params: params
  })
}

// 添加课程
export function createCourse(data) {
  return request({
    url: '/course/add-course/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 编辑课程
export function editCourse(data) {
  return request({
    url: '/course/edit-course/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 课程详情
export function courseDetail(params) {
  return request({
    url: '/course/course-detail/',
    method: 'get',
    params: params
  })
}

// 上传图片
export function uploadCourseImage(data) {
  return request({
    url: '/upload-pic/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}

// 查询名师id
export function getTeacherId(params) {
  return request({
    url: '/course/teacher-list/',
    method: 'get',
    params: params
  })
}

// 章节管理

// 章节列表
export function chapterList(params) {
  return request({
    url: '/course/course-chapter-list/',
    method: 'get',
    params: params
  })
}

// 添加章节
export function createChapter(data) {
  return request({
    url: '/course/add-course-chapter/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 编辑章节
export function editChapter(data) {
  return request({
    url: '/course/edit-course-chapter/',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'post',
    data
  })
}

// 章节详情
export function chapterDetail(params) {
  return request({
    url: '/course/course-chapter-detail/',
    method: 'get',
    params: params
  })
}

// 视频上传
export function uploadVideo(data) {
  return request({
    url: '/upload-video/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data
  })
}
