import Cookies from 'js-cookie'

const TokenKey = 'admin_token'

export function getToken() {
  return Cookies.get(TokenKey)
  // return localStorage.getItem(TokenKey) || ''
}

export function setToken(token) {
  // localStorage.setItem(TokenKey, token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  // localStorage.clear()
  return Cookies.remove(TokenKey)
}
