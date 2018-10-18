import Cookies from 'universal-cookie'

const cookies = new Cookies()
const LOGIN_COOKIE_NAME = 'cf81_whzzcc_cookie_session'

export function isAuthenticated () {
  return cookies.get(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token) {
  cookies.set(LOGIN_COOKIE_NAME, token, {path: '/'})
}

export function logout () {
  cookies.remove(LOGIN_COOKIE_NAME, {path: '/'})
}

export function getDomain (url, subDomain = false) {
  url = url.replace(/(https?:\/\/)?(www.)?/i, '')
  if (!subDomain) {
    url = url.split('.')
    url = url.slice(url.length - 2).join('.')
  }
  if (url.indexOf('/') !== -1) {
    return url.split('/')[0]
  }
  return url
}