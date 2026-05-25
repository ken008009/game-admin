import request from '@/utils/request'
// const qs = require('qs')

export function login(data) {
  return request({
    url: '/api/admin_dhb/login',
    method: 'post',
    data
  })
}

