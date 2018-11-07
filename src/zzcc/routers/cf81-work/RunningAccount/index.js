import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import {Card, Tabs} from 'antd'
import Header from './Header'
import ContentList from './ContentList'
import Forms from './Forms'
import css from './RunningAccount.module.less'

const {TabPane} = Tabs

@inject('runningAccountStore') @observer
class RunningAccount extends Component {

  render () {
    return (
      <div className={css.container}>
        <Header/>
        <Card className={css.listCard}>
          <Tabs defaultActiveKey={1}>
            <TabPane tab="我的申请" key="1">
              <ContentList/>
            </TabPane>
            <TabPane tab="我的待处理" key="2">
              我的待处理
            </TabPane>
          </Tabs>
        </Card>
        <Forms/>
      </div>
    )
  }
}


export default RunningAccount