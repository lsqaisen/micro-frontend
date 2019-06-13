import * as React from 'react';
import { Menu, Dropdown } from 'antd';
import DeleteNode from '@/components/node/delete-node';
import ModifyStatus from '@/components/node/modify-status';
import RemoveNode from '@/components/resource/remove-node';
import styles from './style/index.less';

export default ({ node, resourceName, children, dispatch, onSelect, onUpdate }: any) => {
  const allocatable = node.status.indexOf('SchedulingDisabled') !== -1 ? true : false;
  return (
    <Dropdown
      trigger={["click"]}
      overlayClassName={styles.actions}
      placement="bottomRight"
      content={(
        <Menu className={styles.menus}>
          <ModifyStatus
            key="status"
            btn={<Menu.Item />}
            allocatable={allocatable}
            nodeName={node.name}
            modifyCallback={onUpdate}
            onModify={(data) => {
              return dispatch({
                type: 'resource/remove',
                payload: data
              })
            }}
          >{allocatable ? '开启调度' : '维护'}</ModifyStatus>

          <Menu.Item key="1" onClick={onSelect}>资源池</Menu.Item>
          {!resourceName || resourceName === 'all' ? (
            <DeleteNode
              key="delete"
              btn={<Menu.Item />}
              nodeName={node.name}
              deleteCallback={onUpdate}
              onDelete={(name) => {
                return dispatch({
                  type: 'resource/remove',
                  payload: name
                })
              }}
            >删除</DeleteNode>
          ) : (
              <RemoveNode
                btn={(<Menu.Item />)}
                nodeName={node.name}
                resourceName={resourceName}
                removeCallback={onUpdate}
                onRemove={(data) => {
                  return dispatch({
                    type: 'resource/remove',
                    payload: data
                  })
                }}
              >移除</RemoveNode>
            )}
        </ Menu>
      )}
    >
      {children}
    </Dropdown>
  )
}
