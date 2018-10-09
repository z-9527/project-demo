import { observable, action } from 'mobx'
import zhCN from '../locales/zh-CN'
import enUS from '../locales/en-US'

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