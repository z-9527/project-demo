import React from 'react'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

export default [
  <PrivateRoute key="backend_user" path="/backend/user" component={LoadableComponent(import('./backend/system/User'))}/>,
  <PrivateRoute key="backend_role" path="/backend/role" component={LoadableComponent(import('./backend/system/Role'))}/>,
]