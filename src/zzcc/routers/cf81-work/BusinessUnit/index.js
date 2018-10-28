import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Card, List, Avatar } from 'antd'

import LinkButton from '../../../../components/LinkButton'
import Edit from './Edit'
import css from './BusinessUnit.module.less'

@inject('businessUnitStore') @withRouter @observer
class BusinessUnit extends Component {

  async componentDidMount () {
    await this.props.businessUnitStore.loadList()
  }

  render () {
    const {businessUnitStore} = this.props
    return (
      <div className={css.container}>
        <Card bodyStyle={styles.cardBody}>
          <List dataSource={businessUnitStore.list.slice()}
                loading={businessUnitStore.loading}
                itemLayout="horizontal"
                renderItem={item => (
                  <List.Item actions={[<LinkButton onClick={this.handleEdit.bind(this, item.id)}>edit</LinkButton>, <LinkButton>more</LinkButton>]}>
                    <List.Item.Meta
                      avatar={<img className={css.list_image} src={item.imageUrl ? `${process.env.REACT_APP_API_URL}/b/file/${item.imageUrl}?h=128` : `https://www.gravatar.com/avatar/${item.id}?d=identicon&s=80`}/>}
                      title={item.name}
                      description={item.description}
                    />
                  </List.Item>
                )}>
          </List>
        </Card>
        <Edit/>
      </div>
    )
  }

  handleEdit = async (id) => {
    await this.props.businessUnitStore.edit(id)
  }
}

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default BusinessUnit