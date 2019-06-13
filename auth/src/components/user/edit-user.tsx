import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import EditUserForm from './form/user-form';
import { addUserRequest } from '@/services/user';
import styles from './style/index.less';

export interface EditUserProps {
  visible?: boolean;
  btn?: React.ReactNode;
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
    const { visible, btn, onClose, onSubmit } = this.props;
    const { loading } = this.state;
    return (
      <div>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加用户 <Icon type="plus" />
          </Button>}
        <Drawer
          maskClosable={false}
          title="添加用户"
          width={482}
          placement="right"
          onClose={onClose}
          visible={visible}
        >
          <EditUserForm edit ref="edituser" />
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
      </div>
    )
  }
}

export default EditUser;