import Vue from 'vue'
import service from './index'

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @return {Promise}
 */

function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.put(url, data)
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @return {Promise}
 */

function remove (url, data = {}) {
  return new Promise((resolve, reject) => {
    service.delete(url, { data: data })
      .then(response => {
        resolve(response)
      })
      .catch(err => {
        reject(err)
      })
  })
}

Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.prototype.$delete = remove
