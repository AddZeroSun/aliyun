import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
// const TokenKey = 'XSRF-TOKEN'

export function xsrfToken() {
  // 获取登录态的方法
  return localStorage.getItem('token')
}

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem('token')
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
