import React, { Component } from 'react'
import {Card, Row, Col,} from 'antd'

import css from './RunningAccount.module.less'

class Header extends Component {
  render () {
    return (
      <Card bordered={false}>
        <Row>
          <Col sm={8} xs={24}>
            <Info title="我的待办" value="8个任务" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="共处理" value="32个任务" bordered />
          </Col>
          <Col sm={8} xs={24}>
            <Info title="本周处理" value="24个任务" />
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