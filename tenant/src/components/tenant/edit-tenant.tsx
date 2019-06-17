import { PureComponent } from 'react';
import { Button, Drawer } from 'antd';
import EditForm from './form/edit-tenant-form';

export interface AddUserProps {
  visible?: boolean;
  data?: any;
  onSubmit?: (value: any) => void;
  onClose?: () => void;
}

class AddUser extends PureComponent<AddUserProps, any> {
  static readonly defaultProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
  }

  render() {
    const { visible, data, onClose, onSubmit } = this.props;
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
          <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
          <Button loading={loading} onClick={() => {
            (this.refs.edittenant as any).validateFields(async (error: any, values: any) => {
              if (!error) {
                this.setState({ loading: true })
                if ((await onSubmit!(values)) as any) {
                  this.setState({ loading: false })
                } else {
                  this.setState({ visible: false, loading: false })
                }
              }
            })
          }} type="primary"> 提交 </Button>
        </div>
      </Drawer>
    )
  }
}

export default AddUser;