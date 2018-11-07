import React, { Component } from 'react'
import { Button, List, Avatar } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('runningAccountStore') @observer
class MyApplyList extends Component {

  async componentDidMount () {
    await this.props.runningAccountStore.initMyApply()
  }

  render () {
    const {runningAccountStore} = this.props

    return (
      <div>
        <Button
          type="dashed"
          style={{ width: '100%', marginBottom: 8 }}
          icon="plus"
          onClick={() => runningAccountStore.formOpen()}
        >
          添加
        </Button>
        <List size="large"
              rowKey="id"
              loading={runningAccountStore.loading}
              pagination={runningAccountStore.pagination}
              dataSource={runningAccountStore.list}
              renderItem={() => (
                <List.Item actions={[<a href="#">处理</a>,]}>
                  <List.Item.Meta
                    avatar={<Avatar src={''} shape="square" size="large" />}
                    title={<a href="#">{'item.title'}</a>}
                    description={'item.description'}
                  />
                  123
                </List.Item>
              )}/>
      </div>
    )
  }
}

export default MyApplyList