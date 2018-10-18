import appStore from './appStore'
import localeStore from './LocaleStore'
const stores = require(`../${process.env.REACT_APP_PROJECT_NAME}/stores`)

export default {
  appStore,
  localeStore,
  ...stores.default
}