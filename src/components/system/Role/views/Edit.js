import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Form, Input, Tree } from 'antd'

const TreeNode = Tree.TreeNode
const FormItem = Form.Item

const form = Form.create({
  onFieldsChange (props, changedFields) {
    props.roleStore.onEditFieldChange(changedFields)
  },
  mapPropsToFields (props) {
    const role = props.roleStore
    return {
      name: Form.createFormField(role.editFields.name),
      description: Form.createFormField(role.editFields.description)
    }
  }
})

@inject('roleStore') @form @observer
class Edit extends Component {
  
  render () {
    const {roleStore} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    }
    
    const loop = data => data.map((item) => {
      if (item.children.length > 0) {
        return (
          <TreeNode key={`${item.id}`} title={item.name}>
            {loop(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={`${item.id}`} title={item.name}/>
    })
    
    return (
      <Modal title="角色管理"
             visible={roleStore.modal === 'show'}
             onOk={this.handleOk}
             confirmLoading={roleStore.loading}
             onCancel={this.handleCancel}
      >
        <Form style={{width: 500}}>
          <FormItem label="名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请填写角色名',}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="说明" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{required: true, message: '请填写角色说明',}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="权限" {...formItemLayout}>
            {
              roleStore.platformList.map((item) => {
                const resourceArray = roleStore.resourcesList[item.mark]
                if (resourceArray && resourceArray.length) {
                  return (
                    <div key={item.id}>
                      <div style={{marginLeft: '10px'}}>{item.name}</div>
                      <Tree key={`tree-${item.id}`} checkable showLine
                            onCheck={this.handleTreeNodeCheck.bind(this, item.mark)}
                            checkedKeys={roleStore.editFields.permissions.value}>
                        {loop(resourceArray)}
                      </Tree>
                    </div>
                  )
                }
                return ''
              })
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
  
  handleOk = () => {
    const fields = this.props.roleStore.editFields
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.roleStore.save({
          ...values,
          id: fields.id ? fields.id.value : '',
          permissions: fields.permissions ? fields.permissions.value : []
        })
      }
    })
  }
  
  handleCancel = () => {
    this.props.roleStore.cancelEdit()
  }
  
  handleTreeNodeCheck = (mark, checkedKeys) => {
    this.props.roleStore.onEditkeyChange(checkedKeys, mark)
  }
}

export default Edit