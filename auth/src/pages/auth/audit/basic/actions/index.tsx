import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import styles from './style/index.less';

export default ({ children, onSelect }: any) => {
  return (
    <Dropdown
      trigger={["click"]}
      overlayClassName={styles.actions}
      placement="bottomRight"
      overlay={(
        <Menu className={styles.menus}>
          <Menu.Item key="1" onClick={onSelect}>详情</Menu.Item>
        </Menu>
      )}>
      {children}
    </Dropdown>
  )
}
