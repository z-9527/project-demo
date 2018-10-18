import {observable, action, runInAction} from 'mobx'

class BusinessUnit {
  @observable loading
  @observable list
  @observable pagination

  constructor () {
    this.loading = false

    this.list = [{
      id: 1,
      name: '电力事业部',
      description: '电力项目开发，包括湖南，甘肃等地',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
    }, {
      id: 1,
      name: '电力事业部',
      description: '电力项目开发，包括湖南，甘肃等地',
      imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
    }]
    this.pagination = {}
  }

  @action loadList = async () => {
    this.loading = true

    runInAction(() => {
      this.loading = false
    })
  }
}

export default new BusinessUnit()