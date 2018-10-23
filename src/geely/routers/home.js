import React from 'react'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

export default [
  <PrivateRoute key="home_user" path="/home/configureQuery" component={LoadableComponent(import('./backend/system/User'))}/>,
  <PrivateRoute key="home_role" path="/home/role" component={LoadableComponent(import('./backend/system/Role'))}/>,
]