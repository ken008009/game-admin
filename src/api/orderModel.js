import request from '@/utils/request'
// const qs = require('qs')

export function userList(params) {
  return request({
    url: '/api/admin_dhb/user_list',
    method: 'get',
    params
  })
}
export function detailList(params) {
  return request({
    url: '/api/admin_dhb/user_recommend',
    method: 'get',
    params
  })
}
export function userLandList(params) {
  return request({
    url: '/api/admin_dhb/user_land',
    method: 'get',
    params
  })
}
export function userBackList(params) {
  return request({
    url: '/api/admin_dhb/user_back_list',
    method: 'get',
    params
  })
}
export function userBuy(params) {
  return request({
    url: '/api/admin_dhb/user_buy',
    method: 'get',
    params
  })
}
export function addCoinUSDT(params) {
  return request({
    url: '/api/admin_dhb/set_usdt',
    method: 'get',
    params
  })
}
export function addCoinGIW(params) {
  return request({
    url: '/api/admin_dhb/set_giw',
    method: 'get',
    params
  })
}
export function addCoinBIW(params) {
  return request({
    url: '/api/admin_dhb/set_biw',
    method: 'get',
    params
  })
}
export function addCoinBIWTwo(params) {
  return request({
    url: '/api/admin_dhb/set_biw_two',
    method: 'get',
    params
  })
}
export function addCompanyNum(params) {
  return request({
    url: '/api/admin_dhb/set_one_two_three',
    method: 'get',
    params
  })
}
export function setLevel(params) {
  return request({
    url: '/api/admin_dhb/set_vip',
    method: 'get',
    params
  })
}
export function setMaxWithdraw(params) {
  return request({
    url: '/api/admin_dhb/set_withdraw_max',
    method: 'get',
    params
  })
}
export function setAddress(params) {
  return request({
    url: '/api/admin_dhb/set_address',
    method: 'get',
    params
  })
}
export function setLock(params) {
  return request({
    url: '/api/admin_dhb/set_lock',
    method: 'get',
    params
  })
}
export function setLockReward(params) {
  return request({
    url: '/api/admin_dhb/set_lock_reward',
    method: 'get',
    params
  })
}
export function setCanLand(params) {
  return request({
    url: '/api/admin_dhb/set_can_land',
    method: 'get',
    params
  })
}
export function setCanPlayAdd(params) {
  return request({
    url: '/api/admin_dhb/set_can_play_add',
    method: 'get',
    params
  })
}
export function setCanRent(params) {
  return request({
    url: '/api/admin_dhb/set_can_rent',
    method: 'get',
    params
  })
}
export function setCanSell(params) {
  return request({
    url: '/api/admin_dhb/set_can_sell',
    method: 'get',
    params
  })
}
export function setCanSellSeed(params) {
  return request({
    url: '/api/admin_dhb/set_can_sell_prop',
    method: 'get',
    params
  })
}
export function setCanUseShovel(params) {
  return request({
    url: '/api/admin_dhb/set_can_play_six',
    method: 'get',
    params
  })
}
export function recordList(params) {
  return request({
    url: '/api/admin_dhb/record_list',
    method: 'get',
    params
  })
}
export function gameRewardList(params) {
  return request({
    url: '/api/admin_dhb/reward_list',
    method: 'get',
    params
  })
}
export function buyRewardList(params) {
  return request({
    url: '/api/admin_dhb/reward_list_two',
    method: 'get',
    params
  })
}
export function withDrawList(params) {
  return request({
    url: '/api/admin_dhb/withdraw_list',
    method: 'get',
    params
  })
}
export function userStakeList(params) {
  return request({
    url: '/api/admin_dhb/user_stake_list',
    method: 'get',
    params
  })
}
export function landList(params) {
  return request({
    url: '/api/admin_dhb/land_config_list',
    method: 'get',
    params
  })
}
export function landEdit(data) {
  return request({
    url: '/api/admin_dhb/set_land_config',
    method: 'post',
    data
  })
}
export function seedList(params) {
  return request({
    url: '/api/admin_dhb/seed_config_list',
    method: 'get',
    params
  })
}
export function seedEdit(data) {
  return request({
    url: '/api/admin_dhb/set_seed_config',
    method: 'post',
    data
  })
}
export function toolList(params) {
  return request({
    url: '/api/admin_dhb/prop_config_list',
    method: 'get',
    params
  })
}
export function toolEdit(data) {
  return request({
    url: '/api/admin_dhb/set_prop_config',
    method: 'post',
    data
  })
}
export function otherList(params) {
  return request({
    url: '/api/admin_dhb/get_config',
    method: 'get',
    params
  })
}
export function otherEdit(data) {
  return request({
    url: '/api/admin_dhb/set_config',
    method: 'post',
    data
  })
}
export function blindboxInfo(params) {
  return request({
    url: '/api/admin_dhb/get_box',
    method: 'get',
    params
  })
}
export function saveBlindbox(data) {
  return request({
    url: '/api/admin_dhb/set_box',
    method: 'post',
    data
  })
}
export function setLand(data) {
  return request({
    url: '/api/admin_dhb/set_land',
    method: 'post',
    data
  })
}
export function setSeed(data) {
  return request({
    url: '/api/admin_dhb/set_seed',
    method: 'post',
    data
  })
}
export function setTool(data) {
  return request({
    url: '/api/admin_dhb/set_prop',
    method: 'post',
    data
  })
}
export function setBuyLand(data) {
  return request({
    url: '/api/admin_dhb/set_buy_land',
    method: 'post',
    data
  })
}
export function sendToolList(params) {
  return request({
    url: '/api/admin_dhb/admin_send_list',
    method: 'get',
    params
  })
}
export function sendLandList(params) {
  return request({
    url: '/api/admin_dhb/admin_send_land_list',
    method: 'get',
    params
  })
}
export function adminMsgList(params) {
  return request({
    url: '/api/admin_dhb/admin_messages_list',
    method: 'get',
    params
  })
}
export function delAdminMsg(data) {
  return request({
    url: '/api/admin_dhb/delete_admin_messages',
    method: 'post',
    data
  })
}
export function setAdminMsg(data) {
  return request({
    url: '/api/admin_dhb/set_admin_messages',
    method: 'post',
    data
  })
}
