import { login, logout, getInfo } from '@/api/user'
// import { logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  phone: '',
  lock: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_Lock: (state, lock) => {
    state.lock = lock
  }
}

const actions = {
  // setLock({ commit, lockInfo }){
  //   console.log('lock', lockInfo.lock)
  //   commit('SET_Lock', lockInfo.lock)
  // },
  // set lock
  setLock({ commit }, lockInfo) {
    console.log(lockInfo)
    return new Promise(resolve => {
      commit('SET_TOKEN', lockInfo.lock)
      resolve()
    })
  },
  // user login
  login({ commit }, userInfo) {
    // const { username, password, identifycode } = userInfo
    console.log('userInfo', userInfo)
    // console.log('userInfo', userInfo)
    return new Promise((resolve, reject) => {
      // commit('SET_TOKEN', '1')
      // commit('SET_NAME', '1')
      // commit('SET_AVATAR', '1')
      // commit('SET_PHONE', '1')
      // console.log(1111)
      // resolve()
      login({ username: userInfo.username.trim(), password: userInfo.password, identifycode: userInfo.identifycode }).then(response => {
        const res = response
        console.log(res, 'res')
        if (res && res.code === 200) {
          commit('SET_TOKEN', res.token)
          commit('SET_NAME', res.data[0].username)
          commit('SET_AVATAR', res.data[0].username)
          localStorage.setItem('token', res.token)
          localStorage.setItem('userName', res.data[0].username)
          localStorage.setItem('phone', res.data[0].phone)
          // setToken(data.admin.id)
          resolve(res)
        } else {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          commit('SET_PHONE', '')
          resolve(res)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        localStorage.clear()
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

