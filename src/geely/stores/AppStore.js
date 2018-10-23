import { observable } from 'mobx'
import { action, runInAction } from 'mobx/lib/mobx'
import { notification } from 'antd'
import { json } from '../../framework/utils/ajax'
import * as Session from '../../framework/utils/Session'
import history from '../../framework/customHistory'

class AppStore {
  // top
  @observable userInfo
  @observable loading
  @observable isLogin

  constructor () {
    this.userInfo = {user: {}, company: {}}
    this.loading = false
    this.isLogin = false
  }

  @action login = async (values) => {
    this.loading = true
    try {
      const res = await json.post(`${process.env.REACT_APP_API_URL}/u/login:pc`, values)
      if (res.status === 0) {
        notification.error({message: res.code, description: res.msg})
      } else {
        await this.loginSuccess(res.data.token)
      }
      runInAction(() => {
        this.loading = false
      })
    } catch (e) {
      notification.error({
        message: 'error',
        description: e.message
      })
    }
  }

  @action logout = () => {

  }

  loginSuccess = async (token) => {
    Session.authenticateSuccess(token)
    history.push('/')
    runInAction(() => {
      this.isLogin = true
    })
  }
}

export default new AppStore()