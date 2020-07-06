import request from '@/utils/request'

export function captchaUrl() {
  return 'http://120.77.147.98:8000/appAdmin/'
}

// 登录
export function login(data) {
  return request({
    headers: {
      'Content-Type': 'application/json' // 改这里就好了
    },
    url: '/user/login/',
    method: 'post',
    data
  })
}
export function logout() {
  return request({
    headers: {
      'Content-Type': 'application/json' // 改这里就好了
    },
    url: '/user/logout/',
    method: 'get'
  })
}
