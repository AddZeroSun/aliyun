import request from '@/utils/request'
// 订单管理

// 订单列表
export function orderList(params) {
  return request({
    url: '/order/order-list',
    method: 'get',
    params: params
  })
}

// 订单详情
export function orderDetail(params) {
  return request({
    url: '/order/order-detail',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'get',
    params: params
  })
}
