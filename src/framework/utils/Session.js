import Cookies from 'universal-cookie'

const cookies = new Cookies();
const LOGIN_COOKIE_NAME = 'wnkSessionid'

export function isAuthenticated () {
  return cookies.get(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token) {
  cookies.set(LOGIN_COOKIE_NAME, token, {path: '/'})
}

export function logout () {
  cookies.remove(LOGIN_COOKIE_NAME, {path: '/'})
}