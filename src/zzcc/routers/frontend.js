import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '../../framework/PrivateRoute'
import LoadableComponent from '../../framework/LoadableComponent'

const frontend = [
  <Route key="frontend_1" exact path="/" component={LoadableComponent(import('./Index'))}/>,
  <Route key="frontend_2" exact path="/login" component={LoadableComponent(import('./Login'))}/>,
  <PrivateRoute key="frontend_3" path="/backend" component={LoadableComponent(import('././Backend/index'))}/>,
]

export default frontend