import { observable, action, runInAction, computed } from 'mobx'
import { message } from 'antd'
import { get,  json } from '../framework/utils/ajax'
import * as Session from '../framework/utils/Session'
import history from '../framework/customHistory'

class AppStore {
  // 页面展示
  @observable collapsed
  @observable leftMenuMode
  @observable loading
  // 后台数据
  @observable isLogin
  @observable leftMenu//个人权限菜单
  @observable platformLeftMenu//后台全部权限
  @observable userInfo
  @observable list
  //前台数据
  @observable topMenu //个人权限菜单
  @observable platformTopMenu //前台全部权限
  
  //个人信息
  @observable modal
  @observable forms
  @observable loginInfo
  
  constructor () {
    this.collapsed = false
    this.leftMenuMode = 'inline'
    this.isLogin = !!Session.isAuthenticated()
    this.loading = false
    this.leftMenu = []
    this.userInfo = {user: {}, company: {}}
    this.list = [1, 2, 3, 4]
    this.forms = {}
    this.topMenu = []
    this.platformTopMenu = []
    this.platformLeftMenu = []
    this.loginInfo = ''
    this.company = {}
  }
  
  @action login = async values => {
    try {
      const res = await json.post(`${process.env.REACT_APP_API_URL}/login:pc`, values)
      if (res.status) {
        Session.authenticateSuccess(res.data.token)
        history.push('/')
        history.go(0)  //在store中改变路由，页面并没有变化，使用withRouter可以解决，但在这里并没有效果。原因未知。
        runInAction(() => {
          this.isLogin = true
        })
      } else {
        message.error(res.msg)
        message.info('如无法登录，请尝试初始密码123！')
      }
    } catch (error) {
      message.error(error)
    }
  }
  
  @action logout = async () => {
    try {
      await get(`${process.env.REACT_APP_API_URL}/logout`)
      Session.logout()
      runInAction(() => {
        this.isLogin = false
      })
    } catch (error) {
      message.error(error)
    }
  }
  /**
   * 用户菜单权限
   * @param platformId
   * @returns res [tree]
   */
  @action initSiderMenu = async (platformId) => {
    try {
      const res = await get(`${process.env.REACT_APP_API_URL}/Menu/platformId/${platformId}`)
      if (res.status) {
        runInAction(() => {
          platformId === this.company.backend && (this.leftMenu = res.data)
          platformId === this.company.frontend && (this.topMenu = res.data)
        })
      }
    } catch (error) {
      message.error(error)
    }
  }
  
  /**
   * 平台所有菜单权限
   * @param platformId
   * @returns res [tree]
   */
  @action initPlatformMenu = async (platformId) => {
    const res = await get(`${process.env.REACT_APP_API_URL}/role/permissions/platformId/${platformId}`)
    if (res.status) {
      runInAction(() => {
        platformId === this.company.backend && (this.platformLeftMenu = res.data)
        platformId === this.company.frontend && (this.platformTopMenu = res.data)
      })
    }
  }
  
  @action initUserInfo = async () => {
    const res = await get(`${process.env.REACT_APP_API_URL}/userInfo`)
    if (res.status) {
      runInAction(() => {
        this.userInfo = res.data

      })
    }
  }
  
  @action.bound
  collapse () {
    this.collapsed = !this.collapsed
    this.leftMenuMode = this.collapsed ? 'vertical' : 'inline'
  }
  
  @action
  demo = () => {
    const a = this.list.filter(item => item > 1).map(item => item + 100)
    runInAction(() => {
      this.list = a
    })
  }
  
  @computed
  get fields () {
    let fields = {
      // loginName: {value: this.forms.loginName},
      // name: {value: this.forms.name},
      oldPassword: {value: this.forms.oldPassword},
      password: {value: this.forms.password},
      passwordConfirm: {value: this.forms.passwordConfirm},
      // phone: {value: this.forms.phone},
      // email: {value: this.forms.email},
    }
    return fields
  }
  
  @action.bound
  onEditFieldChange = (changedFields) => {
    const fields = {...this.fields, ...changedFields}
    let forms = {
      // loginName: fields.loginName.value,
      // name: fields.name.value,
      oldPassword: fields.oldPassword.value,
      password: fields.password.value,
      passwordConfirm: fields.passwordConfirm.value,
      // phone: fields.phone.value,
      // email: fields.email.value,
    }
    this.forms = forms
  }
  
  /**
   * 编辑个人信息
   */
  @action editInfo = () => {
    runInAction(() => {
      this.forms = {
        // loginName: '',
        // name: '',
        password: '',
        newPassword: '',
        passwordConfirm: '',
        // phone: '',
        // email: '',
      }
      this.modal = 'show'
    })
  }
  
  /**
   * 保存
   */
  // @action save = async () => {
  //   const res = await json.put(`${process.env.REACT_APP_API_URL}/account`, this.forms)
  //   if(res.status === 0){
  //     message.error(res.msg);
  //     return
  //   }
  //   message.success('修改密码成功！')
  //   runInAction(() => {
  //     this.modal = 'hide'
  //   })
  // }
  @action save = async () => {
      let num;
      runInAction(()=>{
          this.loading = true
      })
      let search = {}
      search.search = this.userInfo.user.loginName;
      const arr = await json.get(`${process.env.REACT_APP_API_URL}/users:search`, search)
      if (json.isError(arr)) {
          runInAction(() => {
              this.loading = false
          })
          return
      }
      for(let i = 0; i <= arr.content.length-1 ; i++){
          if(arr.content[i].loginName === this.userInfo.user.loginName){
              num = arr.content[i].id;
          }
      }
      console.log(this.forms,'sdasd')
      const res = await json.put(`${process.env.REACT_APP_API_URL}/user:updatePassword/${num}?password=${this.forms.password}&oldPassword=${this.forms.oldPassword}`)
      if(res.status === 0){
          runInAction(() => {
              this.loading = false
          })
          message.error(res.msg);
          return
      }
      message.success('修改密码成功！')
      runInAction(() => {
          this.loading = false;
          this.modal = 'hide'
      })
  }


    /**
   *取消编辑
   */
  @action.bound
  cancelEdit () {
    this.loading = false
    this.modal = 'hide'
  }
  
  /**
   * 获取东风登陆参数
   * @returns {Promise.<void>}
   */
  @action getdfacInfo = async () => {
    const df = await get(`${process.env.REACT_APP_API_URL}/onestep/base/depc/getloginInfo`)
    if (!df.status) {
      return
    }
    runInAction(() => {
      this.loginInfo = 'name=' + df.data.name +
        '&timestamp=' + df.data.timestamp +
        '&verification=' + df.data.verification +
        '&token=' + Session.isAuthenticated().toString()
    })
  }
}

export default new AppStore()