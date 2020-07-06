const routes = [{
  name: 'root',
  path: '/',
  redirect: '/home'
},
{
  name: 'login',
  path: '/login',
  component: () => import('@/views/login')
},
{
  name: 'index',
  path: '/index',
  component: () => import('@/views/index'),
  children: [{
    name: 'home',
    path: '/home',
    component: () => import('@/views/home'),
    meta: {
      title: '首页'
    }
  },
  {
    name: 'classify',
    path: '/classify',
    component: () => import('@/views/classify'),
    meta: {
      title: '分类'
    }
  },
  {
    name: 'members',
    path: '/members',
    component: () => import('@/views/members'),
    meta: {
      title: '会员中心'
    }
  },
  {
    name: 'my-course',
    path: '/my-course',
    component: () => import('@/views/my-course'),
    meta: {
      title: '购物车'
    }
  },
  {
    name: 'my',
    path: '/my',
    component: () => import('@/views/my/my.vue')
  },
  {
    name: 'mytrace',
    path: '/mytrace',
    component: () => import('@/views/my/my-trace.vue')
  },
  {
    name: 'mycollect',
    path: '/mycollect',
    component: () => import('@/views/my/my-collect.vue')
  },
  {
    name: 'lecturercenter',
    path: '/lecturercenter',
    component: () => import('@/views/my/lecturer-center.vue')
  }
  ]
},
{
  name: 'all-teacher-elegant',
  path: '/all-teacher-elegant',
  component: () => import('@/views/home/all-teacher-elegant.vue')
},
{
  name: 'Introduction-course',
  path: '/Introduction-course',
  component: () => import('@/views/home/Introduction-course.vue')
},
{
  name: 'lecturercollect',
  path: '/lecturercollect',
  component: () => import('@/views/my/lecturer-collect.vue')
},
{
  name: 'user-info',
  path: '/user-info',
  component: () => import('@/views/my/user-info.vue')
},
{
  name: 'myorders',
  path: '/myorders',
  component: () => import('@/views/my/orders.vue')
},
{
  name: 'teacher-detail',
  path: '/teacherdetail',
  component: () => import('@/views/teacher/teacher-detail.vue')
},
{
  name: 'course-detail',
  path: '/course-detail',
  component: () => import('@/views/course-detail/course-detail')
},

{
  name: 'memberorder',
  path: '/memberorder',
  component: () => import('@/views/members/member-order.vue')
}

]

export default routes
