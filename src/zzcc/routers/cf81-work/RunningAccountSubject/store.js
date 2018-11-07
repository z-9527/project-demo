import {observable} from 'mobx'
import { action, runInAction } from 'mobx/lib/mobx'
import { json } from '../../../../framework/utils/ajax'

class RunningAccountSubjectStore {
  @observable loading
  @observable list

  constructor () {
    this.list = [{
      id: 1,
      name: '出差费',
      type: -1,
    }]
  }

  @action loadList = async (page = 0, size = 20) => {
    this.loading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/runningAccountSubjects`, {page, size})
    if (res.status) {
      runInAction(() => {
        this.list = res.data.content
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }
}

export default new RunningAccountSubjectStore()