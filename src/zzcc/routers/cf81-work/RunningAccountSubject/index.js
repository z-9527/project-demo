import React, { Component } from 'react'
import {inject, observer} from 'mobx-react'
import { Card, Table, Button, Tooltip, Icon, Popconfirm } from 'antd'
import LinkButton from '@/components/LinkButton'
import ListPageHeader from '@/components/system/ListPageHeader'
import css from './RunningAccountSubject.module.less'

const {Column} = Table

@inject('runningAccountSubjectStore') @observer
class RunningAccountSubject extends Component {

  async componentDidMount () {
    await this.props.runningAccountSubjectStore.loadList()
  }

  render () {
    const {runningAccountSubjectStore} = this.props

    const PageToolsBarButtons = (
      <Button.Group>
        <Button icon={'plus'} onClick={this.handleAdd}>
          添加
        </Button>
      </Button.Group>
    )

    return (
      <div className={css.container}>
        <Card className="content-card" bodyStyle={styles.cardBody}>
          <ListPageHeader buttons={PageToolsBarButtons}/>
          <Table rowKey="id" dataSource={runningAccountSubjectStore.list} loading={runningAccountSubjectStore.loading}>
            <Column title="序号" key="id" render={(text, record, index) => index + 1}/>
            <Column title="科目名称" key="name" dataIndex="name"/>
            <Column title="科目类型" key="type" render={(text, record) => record.type > 0 ? '收入' : '支出'}/>
            <Column title="操作" key="operator" render={(text, record) => (
              <Button.Group>
                <Tooltip title="修改">
                  <LinkButton style={{margin: '8px 8px 8px 8px'}} onClick={this.handleEdit.bind(this, record.id)}>
                    <Icon type={'edit'} style={{fontSize: '16px'}}/>
                  </LinkButton>
                </Tooltip>
                <Tooltip title="删除">
                  <Popconfirm
                    title="是否要删除科目？"
                    onConfirm={this.handleDelete.bind(this, record.id)}
                    okText="删除"
                    cancelText="取消"
                    placement="left"
                  >
                    <LinkButton style={{margin: '8px 8px 8px 8px'}}>
                      <Icon type={'delete'} style={{fontSize: '16px', color: '#f5222d'}}/>
                    </LinkButton>
                  </Popconfirm>
                </Tooltip>
              </Button.Group>
            )}/>
          </Table>
        </Card>
      </div>
    )
  }

  handleAdd = () => {
  }

  handleEdit = (id) => {
  }

  handleDelete = (id) => {
  }
}

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default RunningAccountSubject