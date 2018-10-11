import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './framework/PrivateRoute'
import LoadableComponent from './framework/LoadableComponent'

const project = process.env.REACT_APP_PROJECT_NAME
const frontendRouter = require(`./${project}/routers/frontend`)
const Backend = LoadableComponent(import(`./${project}/routers/Backend/index`))

class App extends Component {
  render () {
    return (
      <Switch>
        <Route path={'/backend'} component={Backend}/>
        {frontendRouter.default.map((item, index) => item.private ? (
          <PrivateRoute exact={item.exact} key={`${index}`} path={`${item.path}`}
                        component={LoadableComponent(item.component)}/>
        ) : (
          <Route exact={item.exact} key={`${index}`} path={`${item.path}`}
                 component={LoadableComponent(item.component)}/>
        ))}
      </Switch>
    )
  }
}

export default App
