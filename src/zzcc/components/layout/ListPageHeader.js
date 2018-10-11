import React from 'react'
import classNames from 'classnames';
import styles from './ListPageHeader.module.less'

const ListPageHeader = ({className, buttons, searchForm, children}) => (
  <div className={classNames(styles.pageToolsBar, className)}>
    <div className={styles.main}>
      <div className={styles.toolbar}>{buttons}</div>
      {searchForm && <div className={styles.search}>{searchForm}</div>}
    </div>
    {children && <div className={styles.children}>{children}</div>}
  </div>
)

export default ListPageHeader