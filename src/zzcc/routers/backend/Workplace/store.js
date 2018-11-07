import { observable, action, runInAction } from 'mobx'
import {json} from '@/framework/utils/ajax'

class WorkplaceStore {
  @observable runningAccountLoading
  @observable runningAccountList

  constructor () {
    this.runningAccountLoading = false
    this.runningAccountList = [{title: 'xxxxx出差报销', },{title: 'xxxxx出差报销', }]
  }

  @action initRunningAccountList = async () => {
    this.runningAccountLoading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/workplace/running/account`)
    console.log(res)
    runInAction(() => {
      this.runningAccountLoading = false
    })
  }
}

export default new WorkplaceStore()