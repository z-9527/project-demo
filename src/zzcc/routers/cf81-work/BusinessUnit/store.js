import { observable, action, runInAction } from 'mobx'
import { json } from '../../../../framework/utils/ajax'

class BusinessUnit {
  @observable loading
  @observable list

  @observable modal
  @observable submitting
  @observable businessUnit

  constructor () {
    this.loading = false

    this.list = []
    this.businessUnit = {}
    this.modal = 'hide'
    this.submitting = false
  }

  @action loadList = async () => {
    this.loading = true
    const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/businessUnits`)
    if (res.status) {
      runInAction(() => {
        this.list = res.data
      })
    }
    runInAction(() => {
      this.loading = false
    })
  }

  @action edit = async (id) => {
    this.loading = true
    if (!id) {
      this.businessUnit = {}
    } else {
      const res = await json.get(`${process.env.REACT_APP_API_URL}/zzcc/businessUnit/${id}`)
      if (res.status) {
        runInAction(() => {
          this.businessUnit = res.data
        })
      }
    }
    runInAction(() => {
      this.modal = 'show'
      this.loading = false
    })
  }

  @action save = async () => {
    this.submitting = true
    if (this.businessUnit.id) {
      await json.put(`${process.env.REACT_APP_API_URL}/zzcc/businessUnit/${this.businessUnit.id}`, this.businessUnit)
    } else {
      await json.post(`${process.env.REACT_APP_API_URL}/zzcc/businessUnit`, this.businessUnit)
    }
    runInAction(() => {
      this.modal = 'hide'
      this.submitting = false
    })
    await this.loadList()
  }

  @action cancel = () => {
    this.modal = 'hide'
  }

  @action onEditValueChange = (values) => {
    this.businessUnit = {...this.businessUnit, ...values}
  }
}

export default new BusinessUnit()