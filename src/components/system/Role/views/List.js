import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Button, Icon, Card, Form, Input, Table, Divider, Popconfirm } from 'antd'
import LinkButton from '../../../../components/LinkButton'
import Edit from './Edit'

const ButtonGroup = Button.Group
const FormItem = Form.Item
const SearchInput = Input.Search
const {
  Column
} = Table

@inject('roleStore') @withRouter @observer
class List extends Component {

  async componentDidMount () {
    await Promise.all([
      this.props.roleStore.searchRoleList(),
      this.props.roleStore.fetchResourceList(),
    ])
  }

  render () {
    const {
      roleStore
    } = this.props
    return (
      <Card bodyStyle={styles.cardBody}>
        <div style={{overflow: 'auto', marginBottom: 8}}>
          <ButtonGroupBar onAdd={this.handleAdd}/>
          <SearchForm/>
        </div>
        <Table dataSource={roleStore.list.slice()} pagination={roleStore.pagination} onChange={this.handleTableChange}
               loading={roleStore.loading} rowKey="id" bordered>
          <Column title="名称" dataIndex="name" key="name" width={200} align={'center'}/>
          <Column title="说明" dataIndex="description" key="description" align={'center'}/>
          <Column title="操作" key="operator" width={250} align={'center'} render={(text, record) => (
            <div>
              <LinkButton onClick={this.handleEdit.bind(this, record.id)}><Icon type="edit"/> 修改</LinkButton>
              <Divider type='vertical'/>
              <Popconfirm title='确认删除吗？' onConfirm={() => this.handleDelete(record.id)}>
                <LinkButton><Icon type="delete"/> 删除 </LinkButton>
              </Popconfirm>
            </div>
          )}/>
        </Table>
        <Edit/>
      </Card>

    )
  }

  handleAdd = () => {
    this.props.roleStore.initEdit()
  }
  handleEdit = (id) => {
    this.props.roleStore.initEdit(id)
  }
  handleDelete = (id) => {
    this.props.roleStore.del(id)
  }
  handleTableChange = (pagination, filters, sorter) => {
    this.props.roleStore.searchRoleList(pagination.current)
  }
}

const ButtonGroupBar = ({
                          onAdd
                        }) => (
  <div style={{float: 'right', marginTop: 4}}>
    <ButtonGroup>
      <Button icon="plus" onClick={onAdd}>添加</Button>
    </ButtonGroup>
  </div>
)

const search = Form.create({
  onValuesChange (props, values) {
    props.roleStore.onSearchFieldChange(values)
  },
})

@inject('roleStore') @search
class SearchForm extends Component {
  render () {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <div style={{float: 'left'}}>
        <Form layout="inline">
          <FormItem style={{marginRight: 0}}>
            {getFieldDecorator('search')(
              <SearchInput size="default" style={{width: 240}} placeholder="搜索" onSearch={this.searchHandle}
                           enterButton/>,
            )}
          </FormItem>
        </Form>
      </div>
    )
  }

  searchHandle = () => {
    this.props.roleStore.searchRoleList()
  }
}

const styles = {
  cardBody: {
    padding: '24px',
  },
}

export default List