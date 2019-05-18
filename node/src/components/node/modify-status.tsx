import * as React from 'react';
import { Modal, Button } from 'antd';
import { modifyStatusRequest } from '@/services/node';

export interface ModifyProps {
  btn?: React.ReactNode;
  allocatable: boolean;
  nodeName: string;
  onModify: (data: modifyStatusRequest) => any | PromiseLike<any>;
  modifyCallback?: () => void;
  [key: string]: any;
}

export default ({ btn, nodeName, allocatable, onModify, modifyCallback, ...props }: ModifyProps) => {
  function onClick() {
    Modal.confirm({
      title: `主机${name}`,
      content: `是否${allocatable ? '开启调度' : '进行维护'}?`,
      okType: allocatable ? "primary" : "danger",
      okText: allocatable ? '开启' : '维护',
      cancelText: '取消',
      onOk: () => new Promise(async (resolve, reject) => {
        onModify({ name: nodeName, allocatable: allocatable ? 'uncordon' : 'drain' })
          .then((error: any) => {
            if (!error) {
              modifyCallback!();
              resolve();
            } else {
              reject(error);
            }
          })
      }),
    })
  }
  return !btn ? <Button onClick={onClick} >{allocatable ? '开启' : '维护'}</Button> : React.cloneElement(btn as any, { ...props, onClick })
}