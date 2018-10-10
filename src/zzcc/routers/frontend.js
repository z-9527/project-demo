const frontendRouter = [
  {private: false, exact: true, path: '/', component: import('./Index')},
  {private: false, exact: true, path: '/login', component: import('./Login')},
]

export default frontendRouter