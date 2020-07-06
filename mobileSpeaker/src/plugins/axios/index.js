import axios from 'axios'
import status from './httpStatus'
import './axios'

// 全局的axios默认值
const service = axios.create({
  // baseURL: process.env.BASE_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  },
  withCredentials: true
  // timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {

}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// ==========================================================================
// 拦截响应 response
// ==========================================================================
// response.data 所携带的 code 值用于指示后端出现的特殊状态、异常或错误 (依从数据接口端的设定规则)
// response.data 所携带的 msg 值用于接收后端出现特殊状态、异常或错误时的附加信息
// 未定义 code 或者 code 值为 0 时，后端无任何特殊状态、异常或错误出现
// ==========================================================================

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data
  if (!data.hasOwnProperty('code')) {
    return data
  }

  const error = new Error(data.msg || '')

  error.data = data
  error.response = response

  throw error
}, function (error) {
  // 对响应错误做点什么
  if (error && error.response) {
    error.message = status(error)
  }
  return Promise.reject(error)
})

export default service
