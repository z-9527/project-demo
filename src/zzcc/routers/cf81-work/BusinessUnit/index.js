import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('businessUnitStore') @observer
class BusinessUnit extends Component {
  render () {
    return (
      <div>123</div>
    )
  }
}

export default BusinessUnit