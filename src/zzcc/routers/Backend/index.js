import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Backend from '../../components/layout/Backend'

@inject('backendStore') @observer
class BackendLayout extends Component {

  componentDidMount() {
    const {backendStore} = this.props
    backendStore.initSideMenu()
  }

  render() {
    return <Backend/>
  }
}

export default BackendLayout