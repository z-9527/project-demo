import { observable, action, runInAction } from 'mobx'
import { json } from '../../../../framework/utils/ajax'

class ProjectStore {
  @observable loading
  @observable list

  constructor () {
    this.loading = false
    this.list = []
  }

  @action loadList = async (page = 0, size = 20) => {
    this.loading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/projects`, {page, size})
    if (res.status) {
      runInAction(() => {
        this.list = [{type: 0}, ...res.data.content]
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }
}

export default new ProjectStore()