import { PureComponent } from 'react';
import { Button, Drawer } from 'antd';
import EditForm from './form/edit-tenant-form';

export interface AddUserProps {
  visible?: boolean;
  data?: any;
  submit?: (value: any) => void;
  onClose?: () => void;
}

class AddUser extends PureComponent<AddUserProps, any> {
  static readonly defaultProps = {
    submit: () => null,
    onClose: () => null,
  };

  state = {
    loading: false,
  }

  render() {
    const { visible, data, submit, onClose } = this.props;
    const { loading } = this.state;
    return (
      <Drawer
        destroyOnClose
        maskClosable={false}
        title="编辑工作空间"
        width={482}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <EditForm data={data} ref="edittenant" />
        <div className={"drawer-bottom-actions"} >
          <Button onClick={onClose} style={{ marginRight: 8 }}> 取消 </Button>
          <Button loading={loading} onClick={() => {
            (this.refs.edittenant as any).validateFields(async (error: any, values: any) => {
              if (!error) {
                this.setState({ loading: true })
                if ((await submit!({ ...data, ...values })) as any) {
                } else {
                  onClose!();
                }
                this.setState({ loading: false })
              }
            })
          }} type="primary"> 提交 </Button>
        </div>
      </Drawer>
    )
  }
}

export default AddUser;