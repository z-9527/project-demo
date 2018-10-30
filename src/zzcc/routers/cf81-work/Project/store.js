import { observable, action, runInAction } from 'mobx'
import { json } from '../../../../framework/utils/ajax'

class ProjectStore {
  @observable loading
  @observable list

  constructor () {
    this.loading = false
    this.list = []
  }

  @action loadList = async () => {
    this.loading = true
    const res = {
      status: 1,
      data: [{
        type: 0,
        id: 1,
        name: '1'
      }, {
        id: 1,
        name: '1'
      }]
    }
    if (res.status) {
      runInAction(() => {
        this.list = res.data
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }
}

export default new ProjectStore()