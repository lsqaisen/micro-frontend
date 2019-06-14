import { PureComponent, cloneElement, Fragment } from 'react';
import { Icon, Button, Drawer, List } from 'antd';

export interface ManageGriupProps {
  loading: boolean;
  btn?: React.ReactNode;
  data?: any[];
  onAdd?: (user_id: number) => void;
  onRemove?: (user_id: number) => void;
}

class ManageGriup extends PureComponent<ManageGriupProps, any> {
  static readonly defaultProps = {
    onAdd: () => null,
    onRemove: () => null,
  };

  state = {
    visible: false,
    setting: false,
  }

  render() {
    const { data, btn, loading, onAdd, onRemove } = this.props;
    const { setting, visible } = this.state;
    return (
      <Fragment>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>
            管理用户 <Icon type="setting" />
          </Button>}
        <Drawer
          title="添加用户权限组"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <List
            loading={loading || setting}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={user => (
              <List.Item actions={[<Button type={user.has ? "danger" : "primary"} ghost={user.has} onClick={async () => {
                this.setState({ setting: true });
                if (user.has) {
                  await onRemove!(Number(user.user_id))
                } else {
                  await onAdd!(Number(user.user_id))
                }
                this.setState({ setting: false });
              }}>{user.has ? '移除' : '加入'}</Button>]}>
                <List.Item.Meta
                  title={user.username}
                  description={user.comment}
                />
              </List.Item>
            )}
          />
        </Drawer>
      </Fragment>
    )
  }
}

export default ManageGriup;