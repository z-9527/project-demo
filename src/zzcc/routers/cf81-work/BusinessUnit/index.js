import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { Card, List } from 'antd'

@inject('businessUnitStore') @withRouter @observer
class BusinessUnit extends Component {
  render () {
    const {businessUnitStore} = this.props
    return (
      <div style={{margin: '24px 24px 0'}}>
        <Card bodyStyle={styles.cardBody}>
          <List dataSource={businessUnitStore.list.slice()}
                itemLayout="vertical"
                pagination={{...businessUnitStore.pagination, onChange: (page) => console.log(page)}}
                renderItem={item => (
                  <List.Item key={`${item.id}`}
                             extra={<img width={272} alt="logo" src={item.imageUrl} />}
                             actions={[<span>人数:100</span>, <span>资金池: 100</span>]}>
                    <List.Item.Meta title={item.name}/>
                    {item.description}
                  </List.Item>
                )}>
          </List>
        </Card>
      </div>
    )
  }
}

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default BusinessUnit