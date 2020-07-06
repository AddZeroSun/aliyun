import Cookies from 'js-cookie'
import md5 from 'js-md5'
const TokenKey = 'vue_admin_template_token'
// const TokenKey = 'XSRF-TOKEN'

export function xsrfToken () {
  // 获取登录态的方法
  // return decodeURIComponent(Cookies.get('token'))
  // return localStorage.getItem('token')
  return '1'
  // return 'Bearer ' + localStorage.getItem('Authorization')
}

export function getToken () {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function setSign (data) {
  let str = ''
  let sign = ''
  for (let key in data) {
    str += md5((data[key]).toString())
  }
  sign = md5('T9r2Cd' + str + 'T9r2Cd')
  return sign
}
