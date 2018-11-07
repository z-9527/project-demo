import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Avatar, Row, Col } from 'antd'

import RunningAccount from './RunningAccount'
import css from './Workplace.module.less'

@inject('appStore', 'workplaceStore') @observer
class Workplace extends Component {

  render () {
    const {appStore} = this.props
    return (
      <div>
        <div className={css.header}>
          <div className={css.userInfo}>
            <Avatar size={64} src={''}/>
            <div className={css.text}>
              <h2>{appStore.userInfo.user.name}，你好，祝你开心每一天！</h2>
              <span>这里是您的个人工作台，开始您的工作吧！</span>
            </div>
          </div>
          <div className={css.workInfo}>
            <div className={css.item}>
              <div>项目数</div>
              <h2>20</h2>
            </div>
            <div className={css.item}>
              <div>待审核</div>
              <h2>10</h2>
            </div>
          </div>
        </div>
        <Row>
          <Col span={16}>
            <RunningAccount/>
          </Col>
          <Col span={8}>111</Col>
        </Row>
      </div>
    )
  }
}

export default Workplace