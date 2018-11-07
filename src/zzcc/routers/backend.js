import React from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '@/framework/PrivateRoute'
import LoadableComponent from '@/framework/LoadableComponent'

const backend = [
  <Route key="backend_index" exact path="/backend/" component={LoadableComponent(import('./Index'))}/>,
  <PrivateRoute key="backend_workplace" exact path="/backend/workplace" component={LoadableComponent(import('./backend/Workplace'))}/>,
  <PrivateRoute key="backend_user" exact path="/backend/user" component={LoadableComponent(import('./backend/User'))}/>,
  <PrivateRoute key="backend_role" exact path="/backend/role" component={LoadableComponent(import('./backend/Role'))}/>,
  <PrivateRoute key="backend_business_unit" exact path="/backend/cf81-work/business/unit" component={LoadableComponent(import('./cf81-work/BusinessUnit'))}/>,
  <PrivateRoute key="backend_project" exact path="/backend/cf81-work/project" component={LoadableComponent(import('./cf81-work/Project'))}/>,
  <PrivateRoute key="backend_running_account" exact path="/backend/cf81-work/running/account" component={LoadableComponent(import('./cf81-work/RunningAccount'))}/>,
  <PrivateRoute key="backend_running_account_subject" exact path="/backend/cf81-work/running/account/subject" component={LoadableComponent(import('./cf81-work/RunningAccountSubject'))}/>,
]

export default backend