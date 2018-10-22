import React, { Component } from 'react'
import { Switch } from 'react-router-dom'
import localStore from './stores/LocaleStore'

const project = process.env.REACT_APP_PROJECT_NAME
const frontend = require(`@/${project}/routers/frontend`).default

class App extends Component {

  async componentDidMount() {
    await localStore.initLocaleInServer()
  }

  render () {
    return (
      <Switch>
        {frontend}
      </Switch>
    )
  }
}

export default App
