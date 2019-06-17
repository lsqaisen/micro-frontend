import { PureComponent } from 'react';
import { Button, Modal } from 'antd';
import OverSetForm from './form/user-form';

export interface OverSetProps {
  visible?: boolean;
  submit?: (value: any) => void;
  onClose?: () => void;
}

class OverSet extends PureComponent<OverSetProps, any> {
  static readonly defaultProps = {
    submit: () => null
  };

  state = {
    loading: false,
  }

  render() {
    const { visible, submit, onClose } = this.props;
    const { loading } = this.state;
    console.log(visible)
    return (
      <Modal
        title="资源优先级"
        visible={visible}
        confirmLoading={loading}
        okText="提交"
        cancelText="取消"
        onCancel={onClose}
        onOk={() => {
          (this.refs.overset as any).validateFields(async (error: any, values: any) => {
            if (!error) {
              this.setState({ loading: true })
              if ((await submit!(values)) as any) {
                this.setState({ loading: false })
              } else {
                this.setState({ visible: false, loading: false })
              }
            }
          })
        }}
      >
        <OverSetForm ref="overset" />
      </Modal>
    )
  }
}

export default OverSet;