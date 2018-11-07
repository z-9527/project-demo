import {observable, action, runInAction} from 'mobx'
import { json } from '@/framework/utils/ajax'

class RunningAccountStore {
  @observable loading
  @observable pagination
  @observable list

  @observable formVisible
  @observable runningAccount
  @observable projects

  constructor () {
    this.loading = false
    this.pagination = {}
    this.list = [{id: 1}]

    this.formVisible = false
    this.runningAccount = {}
    this.projects = [{id: 1, name: 'xxx项目'}]
  }

  @action initMyWork = async (page = 0, size = 10) => {
    this.loading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/workplace/my/works`, {page, size})
    if (res.status) {
      runInAction(() => {
        this.list = res.data.content
        this.pagination = {}
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }

  @action initMyApply = async (page = 0, size = 10) => {
    this.loading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/workplace/my/applies`, {page, size})
    if (res.status) {
      runInAction(() => {
        this.list = res.data.content
        this.pagination = {

        }
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }

  @action initMyProject = async (page = 0, size = 10) => {
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/workplace/my/projects`, {page, size})
    console.log(res)
  }

  @action formOpen = () => {
    this.formVisible = true
    this.runningAccount = {}
    // 重新loading，form才会刷新
    this.loading = true
    this.loading = false
  }

  @action formCancel = () => {
    this.formVisible = false
  }
}

export default new RunningAccountStore()