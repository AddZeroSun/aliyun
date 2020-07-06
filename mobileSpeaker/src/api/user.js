import request from '@/utils/request'
// import defaultSettings from '@/settings'
// 获取验证码
export function getSmsCode (data) {
  return request({
    url: '/login/get-sms-code',
    method: 'post',
    data
  })
}
// 检验验证码
export function login (data) {
  return request({
    url: '/login',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    method: 'post',
    data
  })
}
