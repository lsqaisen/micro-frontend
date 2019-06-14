import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import EditUserForm from './form/user-form';
import { addUserRequest } from '@/services/user';
import styles from './style/index.less';

export interface EditUserProps {
  user?: any;
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (value: addUserRequest) => void
}

class EditUser extends PureComponent<EditUserProps, any> {
  static readonly defaultProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
  }

  render() {
    const { visible, user, onClose, onSubmit } = this.props;
    const { loading } = this.state;
    return (
      <Drawer
        destroyOnClose
        maskClosable={false}
        title="添加用户"
        width={482}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <EditUserForm edit user={user} ref="edituser" />
        <div className={"drawer-bottom-actions"} >
          <Button onClick={onClose} style={{ marginRight: 8 }}> 取消 </Button>
          <Button loading={loading} onClick={() => {
            (this.refs.edituser as any).validateFields(async (error: any, values: addUserRequest) => {
              if (!error) {
                this.setState({ loading: true })
                if ((await onSubmit!(values)) as any) {
                  this.setState({ loading: false })
                } else {
                  onClose!()
                }
              }
            })
          }} type="primary"> 提交 </Button>
        </div>
      </Drawer>
    )
  }
}

export default EditUser;