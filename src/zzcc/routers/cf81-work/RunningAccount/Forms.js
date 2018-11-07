import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Form, Input, Select } from 'antd'

const forms = Form.create({
  mapPropsToFields ({runningAccountStore}) {
    return {
      projectId: Form.createFormField({value: runningAccountStore.runningAccount.projectId})
    }
  }
})

@inject('runningAccountStore') @forms @observer
class Forms extends Component {

  async componentDidMount () {
    await this.props.runningAccountStore.initMyProject()
  }

  render () {

    const {runningAccountStore, form: {getFieldDecorator}} = this.props
    return (
      <Modal title="申请"
             visible={runningAccountStore.formVisible}
             onCancel={() => runningAccountStore.formCancel()}
      >
        <Form>
          <Form.Item>
            {getFieldDecorator('projectId', {
              rules: [{required: true, message: '请选择项目',}]
            })(
              <Select>
                {runningAccountStore.projects.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Forms