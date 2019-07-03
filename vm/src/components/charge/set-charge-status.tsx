import * as React from 'react';
import { Modal, Button } from 'antd';

export interface DeleteProps {
  btn?: React.ReactNode;
  status?: boolean;
  submit: () => any | PromiseLike<any>;
  callback?: () => void;
  [key: string]: any;
}

export default ({ btn, status = false, submit, callback, ...props }: DeleteProps) => {
  function onClick() {
    Modal.confirm({
      title: `计费管理`,
      content: `是否${status ? '关闭计费' : '开启计费'}?`,
      okText: '是',
      okType: status ? 'danger' : 'primary',
      cancelText: '否',
      onOk: () => new Promise(async (resolve, reject) => {
        submit()
          .then((error: any) => {
            if (!error) {
              callback!();
              resolve();
            } else {
              reject(error);
            }
          })
      }),
    })
  }
  return !btn ? <Button type="primary" onClick={onClick} >{status ? `关闭计费` : `立即开启`}</Button> : React.cloneElement(btn as any, { ...props, onClick })
}