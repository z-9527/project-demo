import appStore from './AppStore'
import backendStore from './BackendStore'
import userStore from '../../components/system/User/store'
import roleStore from '../../components/system/Role/store'
import businessUnitStore from '../routers/cf81-work/BusinessUnit/store'

const stores = {
  appStore,
  backendStore,
  userStore,
  roleStore,
  businessUnitStore,
}

export default stores