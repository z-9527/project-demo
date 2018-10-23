import { observable, action, runInAction } from 'mobx'
import { json } from '../../framework/utils/ajax'
import { notification } from 'antd'
import * as Session from '../../framework/utils/Session'
import history from '../../framework/customHistory'

class BackendStore {
  // top
  @observable loading

  // side
  @observable collapsed
  @observable leftMenu
  @observable leftMenuMode

  constructor () {
    this.loading = false
    this.collapsed = false
    this.leftMenu = []
    this.leftMenuMode = 'inline'
  }

  @action collapse = () => {
    this.collapsed = !this.collapsed
    this.leftMenuMode = this.collapsed ? 'vertical' : 'inline'
  }

  @action initSideMenu = async () => {
    this.loading = true
    try {
      const res = await json.get(`${process.env.REACT_APP_API_URL}/u/menu/platformMark/backend`)
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