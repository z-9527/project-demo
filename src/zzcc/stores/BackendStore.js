import { observable, action, runInAction } from 'mobx'
import { json } from '../../framework/utils/ajax'
import { notification } from 'antd'
import * as Session from '../../framework/utils/Session'
import history from '../../framework/customHistory'

class BackendStore {
  // top
  @observable userInfo
  @observable loading

  // side
  @observable collapsed
  @observable leftMenu
  @observable leftMenuMode

  @observable isLogin

  constructor () {
    this.userInfo = {user: {}, company: {}}
    this.loading = false

    this.collapsed = false
    this.leftMenu = []
    this.leftMenuMode = 'inline'

    this.isLogin = false
  }

  @action collapse = () => {
    this.collapsed = !this.collapsed
    this.leftMenuMode = this.collapsed ? 'vertical' : 'inline'
  }

  @action login = async (values) => {
    this.loading = true
    try {
      const res = await json.post(`${process.env.REACT_APP_API_URL}/u/login:pc`, values)
      if (res.status === 0) {
        notification.error({message: res.code, description: res.msg})
      } else {
        Session.authenticateSuccess(res.data.token)
        history.push('/')
        runInAction(() => {
          this.isLogin = true
        })
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

  @action initSideMenu = async () => {
    this.loading = true
    try {
      const res = await json.get(`${process.env.REACT_APP_API_URL}/u/menu/platformMark/pc`)
      console.log(res)
      if (res.status === 0) {
        notification.error({message: res.code, description: res.msg})
      } else {
        runInAction(() => {
          this.leftMenu = res.data
        })
      }
      runInAction(() => {
        this.loading = false
      })
    } catch (err) {
      notification.error({
        message: 'error',
        description: err.message
      })
    }
  }
}

export default new BackendStore()