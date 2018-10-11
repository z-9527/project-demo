import { observable, action, runInAction } from 'mobx'
import { json, get } from '../../../../framework/utils/ajax'

class UserStore {

  @observable loading
  @observable modal

  @observable search
  @observable pagination
  @observable list
  @observable submitting
  @observable fetching
  @observable selectValue

  @observable resources

  @observable user

  constructor () {
    this.loading = false
    this.modal = 'hide'

    this.search = {}
    this.pagination = {}
    this.list = []
    this.submitting = false
    this.fetching = false
    this.selectValue = []
    this.resources = {
      content: []
    }

    this.user = {roles: []}
  }

  @action init = async () => {

  }

  @action loadList = async (page = 0, size = 10) => {
    this.loading = true
    // 构建查询参数
    let search = {}
    Object.keys(this.search).forEach(key => {
      search[`${key}`] = this.search[key] ? this.search[key] : ''
    })
    search.page = page
    search.size = size
    const res = await json.get(`${process.env.REACT_APP_API_URL}/u/users:search`, search)
    runInAction(() => {
      this.list = res.content
      this.pagination = {
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 50, 100],
        total: res.totalElements,
        results: res.size,
        page: res.number + 1,
        size: res.size,
      }
      this.loading = false
    })
  }

  /**
   * 初始化表单，可以不传参数，初始化全部为 null
   * @param id 根据id查询
   */
  @action initEdit = async (id) => {
    this.loading = true
    if (!id) {
      this.user = {roles: []}
    } else {
      const res = await json.get(`${process.env.REACT_APP_API_URL}/u/user/${id}`)
      console.log(res.data)
      runInAction(() => {
        this.user = {...res.data, password: '', roles: res.data.roles.map(item => item.id)}
      })
    }
    runInAction(() => {
      this.loading = false
      this.modal = 'show'
    })

  }

  /**
   * 获取 角色列表
   * 接口参数：name完全匹配角色名    name_li 模糊匹配角色名  search 模糊匹配 name 和 描述
   * 例子：/roles:search?search.search=r
   */
  @action fetchRoles = async (search, size = 100) => {
    this.fetching = true
    const res = await get(`${process.env.REACT_APP_API_URL}/u/roles:search`, {search, size})
    console.log(res)
    runInAction(() => {
      this.fetching = false
      this.resources = res.data
    })
  }

  /**
   * 保存
   * @param role
   */
  @action save = async () => {
    this.loading = true
    if (this.user.id) {
      await json.put(`${process.env.REACT_APP_API_URL}/u/user/${this.user.id}`, this.user)
    } else {
      await json.post(`${process.env.REACT_APP_API_URL}/u/user`, this.user)
    }
    await this.loadList(this.pagination.page - 1)
    runInAction(() => {
      this.modal = 'hide'
    })
  }

  @action del = async (id) => {
    await json.delete(`${process.env.REACT_APP_API_URL}/a/user/${id}`)
    await this.loadList(this.pagination.page - 1)
  }

  @action.bound
  cancelEdit () {
    this.loading = false
    this.modal = 'hide'
  }

  @action.bound
  onSearchFieldChange (values) {
    this.search = values
  }

  @action
  onEditValueChange = (values) => {
    if (values.roles) {
      this.user = {...this.user, roles: values.roles.map(item => Number(item))}
    } else {
      this.user = {...this.user, ...values}
    }
  }
}

export default new UserStore()