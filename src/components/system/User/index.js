import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Card, Button, Table, Icon, Form, Input, Tooltip, Popconfirm } from 'antd'
import ListPageHeader from '../ListPageHeader'
import LinkButton from '../../LinkButton'
import Edit from './Edit'

const ButtonGroup = Button.Group
const {Column} = Table
const FormItem = Form.Item
const SearchInput = Input.Search

@inject('userStore') @withRouter @observer
class List extends Component {

  async componentDidMount () {
    await this.props.userStore.loadList()
  }

  render () {
    const {userStore} = this.props

    const PageToolsBarButtons = (
      <ButtonGroup>
        <Button icon={'plus'} onClick={this.handleAdd}>
          添加
        </Button>
      </ButtonGroup>
    )

    return (
      <div style={{margin: '24px 24px 0'}}>
        <Card className="content-card" bodyStyle={styles.cardBody}>
          <ListPageHeader
            buttons={PageToolsBarButtons}
            searchForm={<SearchForm/>}
          />

          <Table dataSource={userStore.list.slice()}
                 pagination={userStore.pagination}
                 loading={userStore.loading}
                 rowKey="id"
                 onChange={this.handleTableChange}
                 onShowSizeChange={this.onShowSizeChange}
                 bordered
          >

            <Column title="名称" dataIndex="name" key="name"/>
            <Column title="登录名" dataIndex="loginName" key="loginName"/>
            <Column title="电话" dataIndex="phone" key="phone" width={180}/>
            <Column style={{backgroundColor: '#fff'}} title="操作" key="operator"
                    render={(text, record) => (
                      <ButtonGroup>
                        <Tooltip title="修改">
                          <LinkButton style={{margin: '8px 8px 8px 8px'}} onClick={this.handleEdit.bind(this, record.id)}>
                            <Icon type={'edit'} style={{fontSize: '16px'}}/>
                          </LinkButton>
                        </Tooltip>
                        <Tooltip title="删除">
                          <Popconfirm
                            title="是否要删除该人员？删除后该人员将无法正常使用。"
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
                      </ButtonGroup>
                    )}/>
          </Table>
          <Edit/>
        </Card>
      </div>
    )

  }

  handleAdd = () => {
    this.props.userStore.initEdit()
  }
  handleEdit = (id) => {
    this.props.userStore.initEdit(id)
  }
  handleDelete = (id) => {
    this.props.userStore.del(id)
  }
  handleTableChange = (pagination, filters, sorter) => {
    this.props.userStore.loadList(pagination.current - 1, pagination.pageSize)
  }
  onShowSizeChange = (current, size) => {
    console.log('current', current)
    console.log('size', size)
  }
}

const search = Form.create({
  onValuesChange (props, values) {
    props.userStore.onSearchFieldChange(values)
  },
})

@inject('userStore') @search
class SearchForm extends Component {
  render () {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <div style={{float: 'right'}}>
        <Form layout="inline">
          <FormItem>
            {getFieldDecorator('search')(
              <SearchInput size="default" style={{width: 300}} placeholder="搜索" onSearch={this.searchHandle} enterButton/>,
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

  searchHandle = (e) => {
    const {userStore} = this.props
    userStore.loadList(0, userStore.pagination.size - 1)
  }
}

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default List