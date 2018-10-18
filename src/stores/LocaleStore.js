import { observable, action } from 'mobx'

const project = process.env.REACT_APP_PROJECT_NAME
const zhCN = require(`../${project}/locales/zh-CN`).default
const enUS = require(`../${project}/locales/en-US`).default

class LocaleStore {
  @observable locale

  constructor () {
    this.locale = zhCN
  }

  @action changeLocale = (locale) => {
    this.locale = ((locale) => {
      switch (locale) {
        case 'zh':
          return zhCN
        case 'en':
          return enUS
        default:
          return zhCN
      }
    })(locale)
  }
}

export default new LocaleStore()