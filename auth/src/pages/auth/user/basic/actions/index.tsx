import * as React from 'react';
import { Menu, Popover } from 'antd';
import DeleteUser from '@/components/user/delete-user';
import styles from './style/index.less';

export default ({ user, group_id, children, dispatch, onSelect, onUpdate }: any) => {
  return (
    <Popover
      trigger="click"
      overlayClassName={styles.actions}
      placement="bottomRight"
      content={(
        <Menu mode="inline" className={styles.menus}>
          <Menu.Item><a href="#" onClick={(e) => {
            e.preventDefault();
            window.location.href = `/service/stack/api/export?namespace=${user.namespace}&apps=${user.name}`;
          }}>
          </a>编辑</Menu.Item>
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
      )}
    >
      {children}
    </Popover>
  )
}
