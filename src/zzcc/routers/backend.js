import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

const backend = [
  <Route key="backend_1" exact path="/backend/" component={LoadableComponent(import('./Index'))}/>,
  <PrivateRoute key="backend_2" exact path="/backend/user" component={LoadableComponent(import('./Backend/User'))}/>,
  <PrivateRoute key="backend_3" exact path="/backend/cf81-work/business/unit" component={LoadableComponent(import('./cf81-work/BusinessUnit'))}/>,
]

export default backend