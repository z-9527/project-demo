import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter, Link, Route } from 'react-router-dom'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import PrivateRoute from '../../../framework/PrivateRoute'
import LoadableComponent from '../../../framework/LoadableComponent'
import styles from './Backend.module.less'

const {Header, Content, Sider} = Layout
const {SubMenu, Item} = Menu
const backendRouters = require(`../../routers/backend`)

@inject('backendStore')
@withRouter
@observer
class Backend extends Component {
  render () {
    const {backendStore, match} = this.props

    return (
      <Layout className={styles.contains}>
        <Sider width={250} collapsible collapsed={backendStore.collapsed} onCollapse={() => backendStore.collapse()}>
          <Menu theme="dark" mode={backendStore.leftMenuMode} defaultSelectedKeys={['1']}>
            {backendStore.leftMenu.length && this._createMenuItem(backendStore.leftMenu)}
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            <Row>
              <Col span={1}>
                <span className={styles.icon}>
                  <Icon
                    className={styles.trigger}
                    type={backendStore.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={() => backendStore.collapse()}
                  />
                </span>
              </Col>
              <Col span={19}>
                <Menu mode="horizontal">
                  <Menu.Item key="mail">
                    <img alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style={{height: 30, width: 30}}/>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={4}>
                <Menu className={styles.menu} mode="horizontal">
                  <SubMenu style={{float: 'right'}} title={<span><Icon type="user"/>{backendStore.userInfo.name}</span>}>
                    <Menu.Item key="userInfo">
                      <Link to={'/'}><Icon type="home"/>进入前台</Link>
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item key="logout">
                      <span onClick={() => backendStore.logout()}><Icon type="logout"/>注销</span>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Content style={{height:"100%"}}>
            {backendRouters.default.map((item, index) => item.private ? (
              <PrivateRoute key={`${index}`} exact={item.exact} path={`${match.url}${item.path}`} component={LoadableComponent(item.component)}/>
            ) : (
              <Route key={`${index}`} exact={item.exact} path={`${match.url}${item.path}`} component={LoadableComponent(item.component)}/>
            ))}
          </Content>
        </Layout>
      </Layout>
    )
  }

  _createMenuItem = (arr) => {
    return arr.map(item => {
      if (item.leaf) {
        return (
          <Item key={`${item.id}`}>
            <Link to={item.url}>
              {item.icon && <Icon type={item.icon}/>}
              <span>{item.name}</span>
            </Link>
          </Item>
        )
      } else {
        return (
          <SubMenu key={`${item.id}`}
                   title={
                     <span>{item.icon && <Icon type={item.icon}/>}
                       <span className="nav-text">{item.name}</span>
                     </span>
                   }
          >
            {this._createMenuItem(item.children)}
          </SubMenu>
        )
      }
    })
  }
}

export default Backend