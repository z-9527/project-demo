import React, { Component } from 'react'
import {Card, List, Avatar, Icon} from 'antd'
import {inject, observer} from 'mobx-react'
import css from './Project.module.less'

@inject('projectStore') @observer
class Project extends Component {

  async componentDidMount () {
    await this.props.projectStore.loadList()
  }

  render () {
    const {projectStore} = this.props
    return (
      <div className={css.container}>
        <Card bodyStyle={styles.cardBody}>
          <List grid={{ gutter: 16, column: 3 }}
                dataSource={projectStore.list.slice()}
                loading={projectStore.loading}
                renderItem={item => (
                  <List.Item>
                    {item.type === 0 ? <Add/> : <Content {...item}/>}
                  </List.Item>
                )}>
          </List>
        </Card>
      </div>
    )
  }
}

const Add = () => (
  <div className={css.add_button}>
    <Icon type={'plus'}/>新增项目
  </div>
)

const Content = ({name}) => (
  <Card bodyStyle={{height: 160}} actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="delete" />]}>
    <Card.Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={name}
      description={(<div>管理部门：111</div>)}
    />
  </Card>
)

const styles = {
  cardBody: {
    padding: '8px',
  },
}

export default Project