import { PureComponent } from 'react';
import { Button, Drawer } from 'antd';
import SetOwnerForm, { SetProjectOwenrFormProps } from './form/set-project-owner-form';

export interface SetProjectOwenrProps extends SetProjectOwenrFormProps {
  visible?: boolean;
  data?: any;
  submit?: (value: any) => void;
  onClose?: () => void;
}

class SetProjectOwenr extends PureComponent<SetProjectOwenrProps, any> {
  static readonly defaultProps = {
    submit: () => null
  };

  state = {
    loading: false,
  }

  render() {
    const { visible, data, onClose, submit, userSearch } = this.props;
    const { loading } = this.state;
    return (
      <Drawer
        destroyOnClose
        maskClosable={false}
        title="设置管理员"
        width={482}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <SetOwnerForm data={data} ref="settenantowenr" userSearch={userSearch} />
        <div className={"drawer-bottom-actions"} >
          <Button onClick={onClose} style={{ marginRight: 8 }}> 取消 </Button>
          <Button loading={loading} onClick={() => {
            (this.refs.settenantowenr as any).validateFields(async (error: any, values: any) => {
              if (!error) {
                values.owner_id = Number(values.owner_id);
                this.setState({ loading: true })
                if ((await submit!(values)) as any) {
                } else {
                  onClose!()
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

export default SetProjectOwenr;