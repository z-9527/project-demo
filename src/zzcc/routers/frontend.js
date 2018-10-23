import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

const frontend = [
  <Route key="frontend_index" exact path="/" component={LoadableComponent(import('./Index'))}/>,
  <Route key="frontend_login" exact path="/login" component={LoadableComponent(import('./Login'))}/>,
  <PrivateRoute key="frontend_backend" path="/backend" component={LoadableComponent(import('./BackendMain'))}/>,
]

export default frontend