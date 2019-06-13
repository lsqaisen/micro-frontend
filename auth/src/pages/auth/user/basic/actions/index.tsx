import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import DeleteUser from '@/components/user/delete-user';
import styles from './style/index.less';

export default ({ user, group_id, children, dispatch, onSelect, onUpdate }: any) => {
  return (
    <Dropdown
      trigger={["click"]}
      overlayClassName={styles.actions}
      placement="bottomRight"
      overlay={(
        <Menu className={styles.menus}>
          <Menu.Item key="1" onClick={onSelect}>编辑</Menu.Item>
          <DeleteUser
            key="delete"
            btn={<Menu.Item />}
            name={user.username}
            deleteCallback={onUpdate}
            onDelete={() => {
              return dispatch({
                type: 'user/delete',
                payload: { user_id: user.user_id, group_id }
              })
            }}
          >删除</DeleteUser>
        </Menu>
      )}>
      {children}
    </Dropdown>
  )
}
