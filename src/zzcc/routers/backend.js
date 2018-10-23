import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

const backend = [
  <Route key="backend_index" exact path="/backend/" component={LoadableComponent(import('./Index'))}/>,
  <PrivateRoute key="backend_user" exact path="/backend/user" component={LoadableComponent(import('./backend/User'))}/>,
  <PrivateRoute key="backend_role" exact path="/backend/role" component={LoadableComponent(import('./backend/Role'))}/>,
  <PrivateRoute key="backend_business_unit" exact path="/backend/cf81-work/business/unit" component={LoadableComponent(import('./cf81-work/BusinessUnit'))}/>,
]

export default backend