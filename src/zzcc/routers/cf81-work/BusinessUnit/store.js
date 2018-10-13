import {observable, action, runInAction} from 'mobx'

class BusinessUnit {
  @observable loading
  @observable list

  constructor () {
    this.loading = false

    this.list = []
  }

  @action loadList = async () => {
    this.loading = true

    runInAction(() => {
      this.loading = false
    })
  }
}

export default new BusinessUnit()