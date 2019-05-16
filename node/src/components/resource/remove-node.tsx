import { Modal } from 'antd';

export interface RemoveProps {
  nodeName: string;
  resourceName: string;
  onOk: (...args: any[]) => any | PromiseLike<any>;
}

export default ({ nodeName, resourceName, onOk }: RemoveProps) => {
  Modal.confirm({
    title: `主机${nodeName}`,
    content: `是否将主机${nodeName}从资源池${resourceName}移除?`,
    okText: '是',
    okType: 'danger',
    cancelText: '否',
    onOk,
  })
}