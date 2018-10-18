import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { Form, Input, Icon, Button } from 'antd'
import styles from './index.module.less'

const FormItem = Form.Item
const form = Form.create()

@inject('appStore') @form @observer
class Index extends Component {
  render () {
    const {appStore: {loading}, form: {getFieldDecorator}} = this.props
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={require('./imgs/login_logo.png')} alt=''/>
        </div>
        <div className={styles.loginForm}>
          <div className={styles.titleBar}>
            <img src={require('./imgs/qingdenglu.png')} alt=''/>
          </div>
          <Form className={styles.forms}>
            <FormItem className={styles.textInput}>
              {getFieldDecorator('loginName', {
                rules: [{required: true, message: '用户名不能为空，请输入用户名！'}],
              })(
                <Input size="large" placeholder="用户名" autoComplete="off" prefix={<Icon type="user" style={{fontSize: 16}}/>}/>
              )}
            </FormItem>
            <FormItem className={styles.textInput}>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '密码不能为空，请输入密码！'}],
              })(
                <Input size="large" placeholder="密码" autoComplete="off" prefix={<Icon type="lock" style={{fontSize: 16}}/>}
                       type="password" onPressEnter={this.handleLogin}/>
              )}
            </FormItem>
            <Form.Item>
              为了更好的使用体验，请使用
              <img width={30} height={30} src={require('./imgs/google.png')} alt=""/>
              <img width={30} height={30} src={require('./imgs/firefox.png')} alt=""/>
            </Form.Item>
            <FormItem style={{width: '100%', height: '16.8%', textAlign: 'center'}}>
              <Button type="primary" className={styles.button} loading={loading} disabled={loading} onClick={this.handleLogin}>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }

  handleLogin = () => {
    const {appStore: {login}, form: {validateFieldsAndScroll}} = this.props
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      login(values)
    })
  }
}

export default Index