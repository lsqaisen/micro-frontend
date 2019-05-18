import * as React from 'react';
import { Drawer, List, Tag } from 'antd';

export interface ManageResourceProps {
  visible?: boolean;
  resourceName: string;
  resources: any[];
  allResources: any[];
  loading?: boolean;
  actions?: any[];
  onClose?: () => void;
}

const ManageResource = ({ visible, resourceName, resources, allResources, actions, loading, onClose }: ManageResourceProps) => {
  return (
    <Drawer
      visible={visible}
      title="资源池管理"
      width={500}
      placement="right"
      onClose={onClose}
    >
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={allResources}
        renderItem={(item: any) => (
          <List.Item actions={[React.cloneElement(actions![resources.some(v => v === item.name) ? 0 : 1], { resourceName: item.name })]}>
            <List.Item.Meta
              title={<React.Fragment>
                {item.name === resourceName && <Tag color="#87d068">当前</Tag>}
                {`${item.tag}(${item.name})`}
              </React.Fragment>}
              description={item.desc}
            />
          </List.Item >
        )
        }
      />
    </Drawer >
  )
}

export default ManageResource;