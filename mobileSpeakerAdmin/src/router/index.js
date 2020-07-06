import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/reset-password/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/lock',
    name: 'lock',
    component: () => import('@/views/lock'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      meta: {
        title: '首页',
        icon: 'home'
      },
      component: () => import('@/views/home/home')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user-management',
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'user_m'
    },
    children: [
      {
        path: '/user-user-management',
        component: () => import('@/views/user-management/user-management/index'),
        name: 'user-user-management',
        meta: { title: '' },
        children: [
          {
            path: '/user-management',
            component: () => import('@/views/user-management/user-management/user-management'),
            name: 'user-management',
            meta: { title: '用户管理' }
          },
          {
            path: '/user-management-detail',
            component: () => import('@/views/user-management/user-management/user-management-detail'),
            name: 'artist-management-detail',
            hidden: true,
            meta: { title: '用户详情' }
          },
          {
            path: '/add-user-management',
            component: () => import('@/views/user-management/user-management/add-edit-user-management'),
            name: 'add-artist-management',
            hidden: true,
            meta: { title: '添加用户' }
          },
          {
            path: '/edit-artist-management',
            component: () => import('@/views/user-management/user-management/add-edit-user-management'),
            name: 'edit-artist-management',
            hidden: true,
            meta: { title: '修改用户' }
          }
        ]
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher-management',
    name: 'teacher',
    meta: {
      title: '名师管理',
      icon: 'teacher'
    },
    children: [
      {
        path: '/teacher-list-management',
        component: () => import('@/views/teacher-management/teacher-management/index'),
        name: 'teacher-list-management',
        meta: { title: '' },
        children: [
          {
            path: '/teacher-management',
            component: () => import('@/views/teacher-management/teacher-management/teacher-management'),
            name: 'teacher-management',
            meta: { title: '名师管理' }
          },
          {
            path: '/add-edit-teacher-management',
            component: () => import('@/views/teacher-management/teacher-management/add-edit-teacher-management'),
            name: 'add-teacher-management',
            hidden: true,
            meta: { title: '添加名师' }
          },
          {
            path: '/edit-teacher-management',
            component: () => import('@/views/teacher-management/teacher-management/add-edit-teacher-management'),
            hidden: true,
            name: 'edit-teacher-management',
            meta: { title: '编辑名师' }
          }
        ]
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course-management',
    name: 'course',
    meta: {
      title: '课程管理',
      icon: 'kecheng'
    },
    children: [
      {
        path: '/course-list-management',
        component: () => import('@/views/course-management/course-management/index'),
        name: 'course-list-management',
        meta: { title: '' },
        children: [
          {
            path: '/course-management',
            component: () => import('@/views/course-management/course-management/course-management'),
            name: 'course-management',
            meta: { title: '课程管理' }
          },
          {
            path: '/course-management-detail',
            component: () => import('@/views/course-management/course-management/course-management-detail.vue'),
            name: 'course-management-detail',
            hidden: true,
            meta: { title: '课程详情' }
          },
          {
            path: '/add-course-management',
            component: () => import('@/views/course-management/course-management/add-edit-course-management'),
            name: 'add-course-management',
            hidden: true,
            meta: { title: '添加课程' }
          },
          {
            path: '/edit-course-management',
            component: () => import('@/views/course-management/course-management/add-edit-course-management'),
            hidden: true,
            name: 'edit-course-management',
            meta: { title: '编辑课程' }
          },
          {
            path: '/chapter-management',
            component: () => import('@/views/course-management/chapter-management/chapter-management'),
            hidden: true,
            name: 'chapter-management',
            meta: { title: '章节管理' }
          },
          {
            path: '/chapter-management-detail',
            component: () => import('@/views/course-management/chapter-management/chapter-management-detail.vue'),
            name: 'chapter-management-detail',
            hidden: true,
            meta: { title: '章节详情' }
          },
          {
            path: '/add-chapter-management',
            component: () => import('@/views/course-management/chapter-management/add-edit-chapter-management'),
            name: 'add-chapter-management',
            hidden: true,
            meta: { title: '添加章节' }
          },
          {
            path: '/edit-chapter-management',
            component: () => import('@/views/course-management/chapter-management/add-edit-chapter-management'),
            hidden: true,
            name: 'edit-chapter-management',
            meta: { title: '编辑章节' }
          }
        ]
      }
      // {
      //   path: '/chapter-list-management',
      //   component: () => import('@/views/course-management/chapter-management/index'),
      //   hidden: true,
      //   name: 'chapter-list-management',
      //   meta: { title: '章节管理' },
      //   children: [
      //     {
      //       path: '/chapter-management',
      //       component: () => import('@/views/course-management/chapter-management/chapter-management'),
      //       name: 'chapter-management',
      //       meta: { title: '章节管理' }
      //     },
      //     {
      //       path: '/chapter-management-detail',
      //       component: () => import('@/views/course-management/chapter-management/chapter-management-detail.vue'),
      //       name: 'chapter-management-detail',
      //       hidden: true,
      //       meta: { title: '章节详情' }
      //     },
      //     {
      //       path: '/add-chapter-management',
      //       component: () => import('@/views/course-management/chapter-management/add-edit-chapter-management'),
      //       name: 'add-chapter-management',
      //       hidden: true,
      //       meta: { title: '添加章节' }
      //     },
      //     {
      //       path: '/edit-chapter-management',
      //       component: () => import('@/views/course-management/chapter-management/add-edit-chapter-management'),
      //       hidden: true,
      //       name: 'edit-chapter-management',
      //       meta: { title: '编辑章节' }
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/order-management-all',
    component: Layout,
    redirect: '/order-management',
    name: 'order-management-all',
    meta: {
      // roles: ['editor'],
      title: '订单管理',
      icon: 'order'
    },
    children: [
      {
        path: '/order-order-management',
        component: () => import('@/views/order-management/order-management'),
        name: 'order-order-management',
        meta: { title: '' },
        children: [
          {
            path: '/order-management',
            component: () => import('@/views/order-management/order-management/order-management'),
            name: 'order-management',
            meta: { title: '订单管理' }
          },
          {
            path: '/order-detail',
            component: () => import('@/views/order-management/order-management/order-detail'),
            name: 'order-detail',
            hidden: true,
            meta: { title: '订单详情' }
          },
          {
            path: '/refund-detail',
            component: () => import('@/views/order-management/order-management/refund-detail'),
            name: 'refund-detail',
            hidden: true,
            meta: { title: '退款订单详情' }
          }
        ]
      }
    ]
  },
  {
    path: '/system-management',
    component: Layout,
    redirect: '/system-management/system',
    meta: {
      title: '系统管理',
      icon: 'system'
    },
    children: [
      {
        path: '/system-management/system',
        name: 'system-management',
        component: () => import('@/views/system-management/system-management/system-management.vue'),
        meta: { title: '系统管理' }
      },
      {
        path: '/admin-management',
        name: 'admin-management',
        component: () => import('@/views/system-management/system-management/admin-management.vue'),
        meta: { title: '权限管理' }
      },
      {
        path: '/admin-management/add',
        name: 'add-admin-management',
        component: () => import('@/views/system-management/system-management/add-edit-admin-management.vue'),
        hidden: true,
        meta: { title: '添加管理员' }
      },
      {
        path: '/admin-management/edit',
        name: 'edit-admin-management',
        component: () => import('@/views/system-management/system-management/add-edit-admin-management.vue'),
        hidden: true,
        meta: { title: '编辑管理员' }
      },
      {
        path: '/add-carousel-management',
        component: () => import('@/views/system-management/system-management/add-edit-carousel-management.vue'),
        name: 'add-carousel-management',
        hidden: true,
        meta: { title: '添加轮播图' }
      },
      {
        path: '/edit-carousel-management',
        component: () => import('@/views/system-management/system-management/add-edit-carousel-management.vue'),
        name: 'edit-carousel-management',
        hidden: true,
        meta: { title: '编辑轮播图' }
      }
    ]
  },
  // {
  //   path: '/content-management',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'content-management',
  //       component: () => import('@/views/content-management/index'),
  //       meta: { title: '内容管理', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/operations-management',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'operations-management',
  //       component: () => import('@/views/operations-management/index'),
  //       meta: { title: '运营管理', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/product-management',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'product-management',
  //       component: () => import('@/views/product-management/index'),
  //       meta: { title: '商品管理', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/finance-management',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'finance-management',
  //       component: () => import('@/views/finance-management/index'),
  //       meta: { title: '财务管理', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
