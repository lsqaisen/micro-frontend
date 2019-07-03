import * as React from 'react';
import { Modal, Button } from 'antd';

export interface DeleteProps {
  btn?: React.ReactNode;
  data?: any;
  onDelete: (name: string) => any | PromiseLike<any>;
  deleteCallback?: () => void;
  [key: string]: any;
}

export default ({ btn, data = {}, onDelete, deleteCallback, ...props }: DeleteProps) => {
  function onClick() {
    Modal.confirm({
      title: `工作空间${data.name}`,
      content: `是否删除工作空间${data.name}?`,
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk: () => new Promise(async (resolve, reject) => {
        onDelete(data.name)
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