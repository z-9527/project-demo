import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Input, Icon, Button } from 'antd'
import LinkButton from '../../../components/LinkButton'

const FormItem = Form.Item
const form = Form.create()

@inject('appStore', 'backendStore') @form @observer
class Login extends Component {
  render () {
    const {form: {getFieldDecorator}, backendStore} = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('loginName', {
            rules: [{
              required: true, message: '请输入账户名！',
            }],
          })(
            <Input size="large" prefix={<Icon type="user"/>} placeholder="请输入用户名"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码！',
            }],
          })(
            <Input size="large" prefix={<Icon type="lock"/>} type="password" placeholder="请输入密码"/>
          )}
        </FormItem>
        <FormItem>
          <LinkButton>忘记密码</LinkButton>
          <Button size="large" loading={backendStore.loading} type="primary" htmlType={'submit'}>
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.backendStore.login(values);
      }
    });
  }
}

export default Login