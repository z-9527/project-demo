import appStore from './AppStore'
import backendStore from './BackendStore'
import userStore from '../../components/system/User/store'
import roleStore from '../../components/system/Role/store'
import businessUnitStore from '../routers/cf81-work/BusinessUnit/store'
import projectStore from '../routers/cf81-work/Project/store'
import runningAccountSubjectStore from '../routers/cf81-work/RunningAccountSubject/store'
import runningAccountStore from '../routers/cf81-work/RunningAccount/store'
import workplaceStore from '../routers/backend/Workplace/store'

const stores = {
  appStore,
  backendStore,
  userStore,
  roleStore,
  businessUnitStore,
  projectStore,
  runningAccountSubjectStore,
  runningAccountStore,
  workplaceStore,
}

export default stores