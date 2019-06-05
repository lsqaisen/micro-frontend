import * as React from 'react';
import { Menu, Popover } from 'antd';
import DeleteApp from '@/components/app/delete-app';
import styles from './style/index.less';

export default ({ app, stackName, children, dispatch, onSelect, onUpdate }: any) => {
  return (
    <Popover
      trigger="click"
      overlayClassName={styles.actions}
      placement="bottomRight"
      content={(
        <Menu className={styles.menus}>
          <Menu.Item><a href="#" onClick={(e) => {
            e.preventDefault();
            window.location.href = `/service/stack/api/export?namespace=${app.namespace}&apps=${app.name}`;
          }}>
          </a> 导出</Menu.Item>
          <DeleteApp
            key="delete"
            btn={<Menu.Item />}
            name={app.name}
            deleteCallback={onUpdate}
            onDelete={(name) => {
              return dispatch({
                type: 'app/delete',
                payload: { name, stack: stackName }
              })
            }}
          >删除</DeleteApp>
        </Menu>
      )}
    >
      {children}
    </Popover>
  )
}
