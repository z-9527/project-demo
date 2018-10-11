
const backendRouter = [
  {private: true, exact: true, path: '/', component: import('./Index')},
  {private: true, exact: true, path: '/user', component: import('./Backend/User')},
]

export default backendRouter