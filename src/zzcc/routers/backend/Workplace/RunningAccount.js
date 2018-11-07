import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Card, List, Avatar } from 'antd'

import css from './Workplace.module.less'

@inject('workplaceStore') @observer
class RunningAccount extends Component {

  async componentDidMount () {
    await this.props.workplaceStore.initRunningAccountList()
  }

  render () {
    const {workplaceStore} = this.props
    return (
      <Card className={css.runningAccountCard} title="我的待办" extra={<a href="#">全部待办</a>}>
        <List itemLayout="horizontal"
              dataSource={workplaceStore.runningAccountList}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.title}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                </List.Item>
              )}
        />
      </Card>
    )
  }
}

export default RunningAccount