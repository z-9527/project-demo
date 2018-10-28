import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Modal, Form, Input, Upload, Icon } from 'antd'
import css from './BusinessUnit.module.less'

const form = Form.create({
  mapPropsToFields (props) {
    const businessUnitStore = props.businessUnitStore
    return {
      name: Form.createFormField({
        value: businessUnitStore.businessUnit.name,
      }),
      description: Form.createFormField({
        value: businessUnitStore.businessUnit.description,
      }),
    }
  },
  onValuesChange (props, values) {
    const businessUnitStore = props.businessUnitStore
    businessUnitStore.onEditValueChange(values)
  }
})

@inject('businessUnitStore') @form @observer
class Edit extends Component {

  state = {
    uploading: false
  }

  render () {
    const {businessUnitStore, form: {getFieldDecorator}} = this.props
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const uploadButton = (
      <div>
        <Icon type={this.state.uploading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <Modal title="编辑"
             visible={businessUnitStore.modal === 'show'}
             onOk={this.handleOk}
             confirmLoading={businessUnitStore.submitting}
             onCancel={this.handleCancel}
             width={768}>
        <Form>
          <Form.Item label="图像" {...formItemLayout}>
            <Upload name="file"
                    listType="picture-card"
                    className={css.uploader}
                    showUploadList={false}
                    action={`${process.env.REACT_APP_API_URL}/b/file/upload`}
                    onChange={this.handleUpload}
            >
              {businessUnitStore.businessUnit.imageUrl ? <img src={`${process.env.REACT_APP_API_URL}/b/file/${businessUnitStore.businessUnit.imageUrl}?h=128`} alt="avatar" /> : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item label="名称" {...formItemLayout}>
            {getFieldDecorator('name', {
              rules: [{required: true, message: '请填写事业部名称',}]
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item label="说明" {...formItemLayout}>
            {getFieldDecorator('description', {
              rules: [{required: true, message: '请填写事业部说明',}]
            })(
              <Input.TextArea rows={5}/>
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  handleCancel = () => {
    this.props.businessUnitStore.cancel()
  }

  handleOk = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        this.props.businessUnitStore.save()
      }
    })
  }

  handleUpload = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        uploading: false,
      })
      const businessUnitStore = this.props.businessUnitStore
      businessUnitStore.onEditValueChange({imageUrl: info.file.response})
    }
  }
}

export default Edit