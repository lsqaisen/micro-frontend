import * as React from 'react';
import { Modal, Button } from 'antd';

export interface DeleteProps {
  btn?: React.ReactNode;
  reset: () => any | PromiseLike<any>;
  resetCallback?: () => void;
  [key: string]: any;
}

export default ({ btn, reset, resetCallback = () => null, ...props }: DeleteProps) => {
  function onClick() {
    Modal.confirm({
      title: `是否取消资源限制？`,
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk: () => new Promise(async (resolve, reject) => {
        reset()
          .then((error: any) => {
            if (!error) {
              resetCallback!();
              resolve();
            } else {
              reject(error);
            }
          })
      }),
    })
  }
  return !btn ? <Button onClick={onClick} >取消资源限制</Button> : React.cloneElement(btn as any, { ...props, onClick })
}