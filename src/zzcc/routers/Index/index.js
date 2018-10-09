import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import Error404 from '../../components/error-page/404'

export default @injectIntl
class Index extends Component {

  static propTypes = {
    intl: intlShape.isRequired,
  }

  render () {
    const {intl: {formatMessage}} = this.props
    return (
      <div>
        <Helmet>
          <title>{formatMessage({id: 'index.title'})}</title>
        </Helmet>
        <FormattedMessage id="index.welcome"/>
        <Error404/>
      </div>
    )
  }
}