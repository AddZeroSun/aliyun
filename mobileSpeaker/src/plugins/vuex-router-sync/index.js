import { sync } from 'vuex-router-sync'
import store from '@/store' // vuex store instance
import router from '@/router' // vue-router instance
// 同步路由状态信息
sync(store, router)
