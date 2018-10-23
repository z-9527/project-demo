import React from 'react'
import { inject, observer } from 'mobx-react'
import { Switch} from 'react-router-dom'
import { Layout, Dropdown, Icon, Tooltip, Menu } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'
import css from './HomePage.module.less'
import SideMenu from '../../../../components/SideMenu'
import history from '../../../../framework/customHistory'
import home from '../../home'

const {Header, Content, Sider, Footer} = Layout

@injectIntl @inject('appStore', 'localeStore') @observer
class HomePage extends React.Component {

  render () {

    const {appStore, localeStore: {locale}} = this.props

    const languageMenu = (
      <Menu onClick={({key}) => this.handleSelectLanguage(key)}>
        <Menu.Item style={{padding: '12px 20px'}} key={'zh'}>中文</Menu.Item>
        <Menu.Item style={{padding: '12px 20px'}} key={'en'}>English</Menu.Item>
        <Menu.Item style={{padding: '12px 20px'}} key={'ar'}>العربية</Menu.Item>
        <Menu.Item style={{padding: '12px 20px'}} key={'es'}>español</Menu.Item>
        <Menu.Item style={{padding: '12px 20px'}} key={'ru'}>русский</Menu.Item>
      </Menu>
    )

    const userMenu = (
      <Menu>
        <Menu.Item style={{padding: '12px 20px', textAlign: 'center', fontWeight: 'bold'}}>
          {appStore.userInfo.user.name},<FormattedMessage id={'HomePage.welcome'}/>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item style={{padding: '12px 20px'}}>
          <div><Icon type="flag"/>&emsp;<FormattedMessage id={'HomePage.subordinate'}/></div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item style={{padding: '12px 20px'}}>
          <div><Icon type="edit"/>&emsp;<FormattedMessage id={'HomePage.password'}/></div>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item style={{padding: '12px 20px'}}>
          <div><Icon type="poweroff"/>&emsp;<FormattedMessage id={'HomePage.logout'}/></div>
        </Menu.Item>
      </Menu>
    )

    const sideMenu = [
      {
        id: '1',
        name: <FormattedMessage id={'HomePage.Configuration'}/>,
        icon: 'search',
        url: `/home/configureQuery`,
        leaf: true,
      },
      {
        id: '2',
        name: <FormattedMessage id={'HomePage.technical'}/>,
        icon: 'file-text',
        url: `/home/technicalNotice`,
        leaf: true,
      },
      {
        id: '3',
        name: <FormattedMessage id={'HomePage.Answer'}/>,
        icon: 'question-circle-o',
        url: `/home/answerCenter`,
        leaf: true,
      },
      {
        id: '4',
        name: <FormattedMessage id={'HomePage.Shopping'}/>,
        icon: 'shopping-cart',
        url: `/home/shoppingCar`,
        leaf: true,
      }
    ]

    return (
      <Layout>
        <Header className={css.header}>
          <div className={css.logo}>
            <span><FormattedMessage id={'HomePage.title'}/></span>
          </div>
          <div className={css.menu}>
            <Dropdown overlay={languageMenu}>
              <span style={{fontSize: 16}}>{this.props.localeStore.locale.lang} <Icon type="down" style={{fontSize: 18, verticalAlign: 'middle'}}/></span>
            </Dropdown>
            <Tooltip title={<FormattedMessage id={'HomePage.backend'}/>}>
              <Icon type={'desktop'} style={{margin: '0 38px'}}
                    onClick={() => {
                      sessionStorage.clear()
                      history.push('/backend')
                    }}/>
            </Tooltip>
            <Dropdown overlay={userMenu}>
              <Icon type="user"/>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider className={css.sider} width={['zh', 'ar'].includes(locale.key) ? 200 : 250}>
            <SideMenu dataSource={sideMenu}/>
          </Sider>
          <Layout>
            <Content style={{padding: 24}}>
              <Switch>
                {home}
              </Switch>
            </Content>
            <Footer style={{textAlign: 'center', marginLeft: -100}}>Copyright @ <FormattedMessage id={'HomePage.Geely'}/> 2018</Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }

  handleSelectLanguage = (key) => {
    this.props.localeStore.changeLocale(key)
  }
}

export default HomePage