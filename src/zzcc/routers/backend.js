
const backendRouter = [
  {private: true, exact: true, path: '/', component: import('./Index')},
  {private: true, exact: true, path: '/user', component: import('./Backend/User')},

  {private: true, exact: true, path: '/cf81-work/business/unit', component: import('./cf81-work/BusinessUnit')},
]

export default backendRouter