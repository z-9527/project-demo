const frontendRouter = [
  {private: false, exact: true, path: '/', component: import('./Index')},
  {private: false, exact: true, path: '/login', component: import('./Login')},
  {private: true, exact: false, path: '/backend', component: import('./Backend/index')},
]

export default frontendRouter