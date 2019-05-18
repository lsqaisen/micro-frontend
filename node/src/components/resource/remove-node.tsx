import * as React from 'react';
import { Modal, Button } from 'antd';
import { removeResourceRequest } from '@/services/resource';

export interface RemoveProps {
  btn?: React.ReactNode;
  nodeName?: string;
  resourceName?: string;
  onRemove?: (data: removeResourceRequest) => any | PromiseLike<any>;
  removeCallback?: () => void;
  [key: string]: any;
}

export default ({ btn, nodeName, resourceName, onRemove, removeCallback, ...props }: RemoveProps) => {
  function onClick() {
    Modal.confirm({
      title: `主机${nodeName}`,
      content: `是否将主机${nodeName}从资源池${resourceName}移除?`,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => new Promise(async (resolve, reject) => {
        onRemove!({ resource: resourceName!, name: nodeName! })
          .then((error: any) => {
            if (!error) {
              removeCallback!();
              resolve();
            } else {
              reject(error);
            }
          })
      }),
    })
  }
  return !btn ? <Button {...props} onClick={onClick}>移除</Button> : React.cloneElement(btn as any, { ...props, onClick })
}