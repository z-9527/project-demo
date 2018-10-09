import {observable, action} from 'mobx'

class BackendStore {
  // top
  @observable userInfo
  @observable loading

  // side
  @observable collapsed
  @observable leftMenu
  @observable leftMenuMode

  constructor () {
    this.userInfo = {user: {}, company: {}}
    this.loading = false

    this.collapsed = false
    this.leftMenu = []
    this.leftMenuMode = 'inline'
  }

  @action collapse = () => {
    this.collapsed = !this.collapsed
    this.leftMenuMode = this.collapsed ? 'vertical' : 'inline'
  }

  @action logout = () => {

  }
}

export default new BackendStore()