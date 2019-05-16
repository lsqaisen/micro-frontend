import * as React from 'react';
import { Fragment, useState } from 'react';
import { Menu, Modal, message, Popover } from 'antd';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import reomve from '@/components/resource/remove-node';
import ManageResource from './manage-resource';
import styles from './style/index.less';

export default ({ node, resourceName, allResources, children, dispatch, onUpdate, setNode }: any) => {
  const { name, status, resources } = node;
  const callback = (
    error: any,
    resolve: (value?: any | PromiseLike<any>) => void,
    reject: ((reason?: any) => void),
    call: () => void,
  ) => {
    if (!error) {
      call!();
      onUpdate!();
      resolve();
    } else {
      reject(error);
    }
  }
  const allocatable = status.indexOf('SchedulingDisabled') !== -1 ? true : false;
  return (
    <Popover
      overlayClassName={styles.actions}
      placement="bottomRight"
      content={(
        <Menu
          className={styles.menus}
          onClick={({ key }) => {
            switch (key) {
              case "0":
                Modal.confirm({
                  title: `主机${name}`,
                  content: `是否${allocatable ? '开启调度' : '进行维护'}?`,
                  okType: allocatable ? "primary" : "danger",
                  okText: allocatable ? '开启' : '维护',
                  cancelText: '取消',
                  onOk() {
                    return new Promise(async (resolve, reject) => {
                      dispatch({
                        type: 'node/modifyStatus',
                        payload: {
                          name,
                          allocatable: allocatable ? 'uncordon' : 'drain',
                        }
                      }).then(callback.bind(this, resolve, reject, () => {
                        allocatable ? message.info('开启调度成功') : message.info('进行维护成功')
                      }))
                    })
                  },
                })
                return;
              case "1":
                return;
              case "2":
                reomve({
                  nodeName: name,
                  resourceName,
                  onOk() {
                    return new Promise(async (resolve, reject) => {
                      dispatch({
                        type: 'resource/remove',
                        payload: { name, resource: resourceName }
                      }).then(callback.bind(resolve, reject))
                    })
                  },
                });
                return;
              case "3":
                Modal.confirm({
                  title: `主机${name}`,
                  content: `是否删除主机${name}?`,
                  okText: '是',
                  okType: 'danger',
                  cancelText: '否',
                  onOk() {
                    return new Promise(async (resolve, reject) => {
                      dispatch({
                        type: 'node/delete',
                        payload: name
                      }).then((error: any) => {
                        if (!error) {
                          onUpdate!();
                          resolve();
                        } else {
                          reject(error);
                        }
                      })
                    })
                  },
                })
                return;
            }
          }}>
          <Menu.Item key="0">{allocatable ? '开启调度' : '维护'}</Menu.Item>
          <Menu.Item key="1">资源池
            {/* <ManageResource
              name={name}
              resourceName={resourceName}
              resources={resources}
              allResources={allResources}
              onUpdate={onUpdate}
            /> */}
          </Menu.Item>
          {!resourceName || resourceName === 'all' ? <Menu.Item key="3">删除</Menu.Item> : <Menu.Item key="2">移除</Menu.Item>}
        </Menu>
      )}
    >
      {React.cloneElement(children)}
    </Popover>
  )
}