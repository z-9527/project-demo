import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Form, Input, Select, Spin } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const form = Form.create({
  mapPropsToFields (props) {
    const userStore = props.userStore
    return {
      name: Form.createFormField({
        value: userStore.user.name,
      }),
      loginName: Form.createFormField({
        value: userStore.user.loginName,
      }),
      password: Form.createFormField({
        value: userStore.user.password,
      }),
      phone: Form.createFormField({
        value: userStore.user.phone,
      }),
      roles: Form.createFormField({
        value: userStore.user.roles.map(item => `${item}`),
      }),
    }
  },
  onValuesChange (props, values) {
    const userStore = props.userStore
    userStore.onEditValueChange(values)
  }
})

@inject('userStore') @form @observer
class Edit extends Component {
  state = {
    confirmDirty: false,
  }

  async componentDidMount () {
    await this.props.userStore.fetchRoles()
  }

  render () {
    const {userStore} = this.props
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      oneCol: {
        labelCol: {span: 3},
        wrapperCol: {span: 21},
      },
      threeCol: {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
      },
    }

    return (
      <Modal title="编辑"
             visible={userStore.modal === 'show'}
             onOk={this.handleOk}
             confirmLoading={userStore.submitting}
             onCancel={this.handleCancel}
             width={768}
      >
        <Form>
          <FormItem label="姓名" {...formItemLayout.oneCol} >
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请填写员工姓名',}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="登录名" {...formItemLayout.oneCol}>
            {getFieldDecorator('loginName', {
              rules: [{required: true, message: '请填写员工登录名'}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="联系电话" {...formItemLayout.oneCol}>
            {getFieldDecorator('phone', {
              rules: [{required: true, message: '请输入联系电话'}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="密码：" {...formItemLayout.oneCol}>
            {getFieldDecorator('password', {
              rules: [{required: true, message: '请输入密码'}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="重复输入密码" {...formItemLayout.oneCol}>
            {getFieldDecorator('confirm', {
              rules: [{required: true, message: '请再次输入密码'},{validator: this.compareToFirstPassword}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="绑定角色" {...formItemLayout.oneCol}>
            {getFieldDecorator('roles', {})(
              <Select
                mode="multiple"
                size={'default'}
                allowClear
                placeholder="请输入角色名选择相应的角色"
                notFoundContent={userStore.fetching ? <Spin size="small"/> : null}
                filterOption={false}
                onSearch={(value) => userStore.fetchRoles(value)}
                style={{width: '100%'}}
              >
                {userStore.resources.content.map(item => <Option key={`${item.id}`}>{item.name}</Option>)}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致，请重新输入');
    } else {
      callback();
    }
  }

  handleOk = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userStore.save()
      }
    })
  }

  handleCancel = () => {
    this.props.userStore.cancelEdit()
  }

}

export default Edit