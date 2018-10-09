import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { configure } from 'mobx'
import { Provider, inject, observer } from 'mobx-react'
import { LocaleProvider } from 'antd'
import { IntlProvider, addLocaleData } from 'react-intl'
import enLocale from 'react-intl/locale-data/en'
import zhLocale from 'react-intl/locale-data/zh'
import stores from './stores'
import history from './framework/customHistory'
import { Router } from 'react-router-dom'

configure({
  enforceActions: true
})

// 国际化
addLocaleData([...enLocale, ...zhLocale])
const MobxIntlProviderChild = ({localeStore, children, ...props}) => {
  return (
    <IntlProvider locale={localeStore.locale.locale} messages={localeStore.locale.messages}
                  formats={localeStore.locale.formats} {...props}>
      <LocaleProvider locale={localeStore.locale.antd}>
        {children}
      </LocaleProvider>
    </IntlProvider>
  )
}
const MobxIntlProvider = inject('localeStore')(observer(MobxIntlProviderChild))

ReactDOM.render(
  <Provider {...stores}>
    <MobxIntlProvider>
      <Router basename="/" history={history}>
        <App/>
      </Router>
    </MobxIntlProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
