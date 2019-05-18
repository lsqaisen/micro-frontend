import * as React from 'react';
import { Modal, Button } from 'antd';

export interface DeleteProps {
  btn?: React.ReactNode;
  nodeName: string;
  onDelete: (name: string) => any | PromiseLike<any>;
  deleteCallback?: () => void;
  [key: string]: any;
}

export default ({ btn, nodeName, onDelete, deleteCallback, ...props }: DeleteProps) => {
  function onClick() {
    Modal.confirm({
      title: `主机${nodeName}`,
      content: `是否删除主机${nodeName}?`,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => new Promise(async (resolve, reject) => {
        onDelete(nodeName)
          .then((error: any) => {
            if (!error) {
              deleteCallback!();
              resolve();
            } else {
              reject(error);
            }
          })
      }),
    })
  }
  return !btn ? <Button onClick={onClick} >删除</Button> : React.cloneElement(btn as any, { ...props, onClick })
}