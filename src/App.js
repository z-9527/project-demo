import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { Switch,withRouter } from 'react-router-dom'
import {injectIntl} from 'react-intl'

const project = process.env.REACT_APP_PROJECT_NAME
const frontend = require(`@/${project}/routers/frontend`).default

@withRouter @injectIntl @inject('localeStore') @observer
class App extends Component {

  async componentDidMount() {
    await this.props.localeStore.initLocaleInServer()
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
