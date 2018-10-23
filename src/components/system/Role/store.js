import { observable, action, runInAction } from 'mobx'
import { message } from 'antd'
import { json, get } from '../../../framework/utils/ajax'
import { getTreeIds } from '../../../framework/utils/OnestepUtils'

class RoleStore {
  @observable loading
  @observable modal
  @observable platformList
  @observable search
  @observable pagination
  @observable list
  @observable resources
  @observable resourcesList
  @observable editFields

  constructor () {
    this.loading = false
    this.modal = 'hide'
    this.search = {}
    this.pagination = {}
    this.list = []
    this.resources = []
    this.resourcesList = {}
    this.platformList = []
    this.editFields = {permissions: {value: []}}
  }

  /**
   * 查询
   * @param page 页码
   */
  @action searchRoleList = async (page = 1) => {
    runInAction(() => {
      this.loading = true
    })
    const res = await json.get(`${process.env.REACT_APP_API_URL}/u/roles:search`, {...this.search, page: page - 1})
    if (res.status) {
      runInAction(() => {
        this.list = res.data.content
        this.pagination = {
          total: res.data.totalElements,
          results: res.data.size,
          page: res.data.number + 1,
        }
        this.loading = false
      })
    } else {
      message.error(res.msg)
    }
  }

  /**
   * 获取 resource tree
   */
  @action fetchResource = async () => {
    const res = await get(`${process.env.REACT_APP_API_URL}/u/role/permissions`)
    if (res.status) {
      runInAction(() => {
        this.resources = res.data
      })
    } else {
      message.error(res.msg)
    }
  }

  /**
   * 获取 resource List.js<tree>
   */
  @action fetchResourceList = async () => {
    const res = await get(`${process.env.REACT_APP_API_URL}/u/platforms`)
    const resourcesList = {}//所有平台的所有权限
    if (res.status) {
      for (let i = 0; i < res.data.length; i++) {
        const resourceArray = await get(`${process.env.REACT_APP_API_URL}/u/role/permissions/platformId/${res.data[i].id}`)
        resourcesList[res.data[i].mark] = resourceArray.data//xxx平台的所有权限
      }
    } else {
      message.error(res.msg)
    }
    runInAction(() => {
      this.resourcesList = resourcesList
      this.platformList = res.data
    })

  }

  /**
   * 初始化表单，可以不传参数，初始化全部为 null
   * @param id 根据id查询
   */
  @action initEdit = async (id) => {
    runInAction(() => {
      this.loading = true
    })
    if (!id) {
      runInAction(() => {
        this.editFields = {
          permissions: {
            value: []
          }
        }
        this.loading = false
        this.modal = 'show'
      })
    } else {
      const res = await json.get(`${process.env.REACT_APP_API_URL}/u/role/${id}/permission`)
      if (res.status) {
        let editFields = {}
        Object.keys(res.data).forEach(key => {
          if (Array.isArray(res.data[key])) {
            editFields[key] = {value: res.data[key]}
          } else {
            editFields[key] = {value: `${res.data[key]}`}
          }
        })
        runInAction(() => {
          this.editFields = editFields
          this.loading = false
          this.modal = 'show'
        })
      } else {
        message.error(res.msg)
      }
    }
  }

  /**
   * 保存
   * @param role
   */
  @action save = async (role) => {
    if (role.id) {
      await json.put(`${process.env.REACT_APP_API_URL}/u/role/${role.id}`, role)
    } else {
      await json.post(`${process.env.REACT_APP_API_URL}/u/role`, role)
    }
    await this.searchRoleList(this.pagination.page)
    runInAction(() => {
      this.modal = 'hide'
    })
  }

  /**
   * 删除
   * @param id role id
   */
  @action del = async (id) => {
    await json.delete(`${process.env.REACT_APP_API_URL}/u/role/${id}`)
    await this.searchRoleList(this.pagination.page)
  }

  @action.bound
  cancelEdit () {
    this.loading = false
    this.modal = 'hide'
  }

  /**
   * 每次更新search框时，回写数据
   * @param values search数据
   */
  @action.bound
  onSearchFieldChange (values) {
    this.search = values
  }

  @action.bound
  onEditFieldChange (changedFields) {
    this.editFields = {...this.editFields, ...changedFields}
  }

  /**
   * 将两颗树的值放入表单权限字段中
   * @param checkedKeys 当前选中平台的树的keys
   * @param mark 当前选中平台的标识
   */
  @action.bound
  onEditkeyChange (checkedKeys, mark) {
    const platformResourceIds = getTreeIds(this.resourcesList[mark])//获取当前平台所有权限id
    //将当前平台的所有权限，从表单的权限中清空
    let perValue = this.editFields.permissions.value.filter(p => platformResourceIds.indexOf(p) === -1)
    this.editFields.permissions.value = perValue.concat(checkedKeys)//将平台权限放入表单权限
  }

}

export default new RoleStore()