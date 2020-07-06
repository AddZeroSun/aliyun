import axios from 'axios'
// import store from '@/store'
import { xsrfToken, setSign } from '@/utils/auth'
import { Toast } from 'vant'
// import Utils from '@/utils/util.js'
// create an axios instance
const service = axios.create({
  // baseURL: window.location.host === 'm-artist.ac.vip' ? 'https://api-artist.ac.vip/' : (window.location.host === 'beta.m-artist.ac.vip' ? 'http://beta.api-artist.ac.vip/' : 'http://alpha.api-artist.ac.vip/'),
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 120000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    let data = setSign(config.data)
    config.data.sign = data
    // do something before request is sent
    if (xsrfToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-XSRF-TOKEN'] = xsrfToken()
      config.headers['user-from'] = 2
      config.headers['x-sms-token'] = xsrfToken()
      config.headers['token'] = xsrfToken()
    }
    // console.log(config.data)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // console.log(res)
    const status = parseInt(res.code)
    // console.log(status)
    if (status === 401) {
      // Utils.$emit('userLogin', status)
      // // this.$router.push({ path: '/login' })
      // store.dispatch('user/resetToken').then(() => {
      //   location.reload()
      // })
    }
    // console.log(res)
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Toast({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
