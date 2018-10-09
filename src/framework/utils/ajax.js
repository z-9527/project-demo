import 'whatwg-fetch'
import { message } from 'antd'
import { isAuthenticated, logout } from './Session'
import history from '../customHistory'

const error = {status: 0, msg: '网络错误'}
const loginError = {status: 0, msg: '登陆错误'}

export async function get (url, param) {
  try {
    if (param) {
      url = `${url}?${_encodeParam(param)}`
    }
    const response = await fetch(url, {
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': isAuthenticated(),
      })
    })
    if (response.status === 401) {
      // message.error("登陆错误")
      logout()
      history.replace('/login')
      return loginError
    }
    const result = await response.json()
    if (response.status >= 400) {
      // message.error("请求异常1")
      return result
    }
    return result
  } catch (err) {
    return error
  }
}

export async function post (url, param) {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: _encodeParam(param),
    })
    if (response.status === 401) {
      // message.error("登陆错误")
      logout()
      history.replace('/login')
      return loginError
    }
    const result = await response.json()
    if (response.status >= 400) {
      // message.error("请求异常2")
      return result
    }
    return result
  } catch (err) {
    return error
  }
}

async function _json (url, json, method) {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': isAuthenticated(),
      }),
      body: JSON.stringify(json),
    })
    if (response.status === 401) {
      // message.error("登陆错误")
      return loginError
    }
    const result = await response.json()
    if (response.status >= 400) {
      // message.error("请求异常3")
      return result
    }
    return result
  } catch (err) {
    return error
  }
}

export const json = {
  get: async function (url, param) {
    return get(url, param)
  },
  post: async function (url, json) {
    return _json(url, json, 'POST')
  },
  put: async function (url, json) {
    return _json(url, json, 'PUT')
  },
  delete: async function (url) {
    return _json(url, {}, 'DELETE')
  },
  batchDelete: async function (url, json) {
    return _json(url, json, 'DELETE')
  },
  isError: function (res) {
    if (res && res.status === 0) {
      return true
    }
    return false
  }
}

function _encodeParam (param) {
  return Object.keys(param)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(param[key] ? param[key] : '')}`)
    .join('&')
}