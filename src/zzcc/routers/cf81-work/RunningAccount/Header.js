import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import {Card, Row, Col,} from 'antd'

import css from './RunningAccount.module.less'

@inject('runningAccountStore') @observer
class Header extends Component {
  render () {
    return (
      <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <Info title="我的申请" value="8个申请" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="我的事务" value="32个待处理" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="我的项目" value="24个项目" />
          </Col>
        </Row>
      </Card>
    )
  }
}

const Info = ({ title, value, bordered }) => (
  <div className={css.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
)
export default Header