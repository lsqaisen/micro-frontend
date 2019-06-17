import { PureComponent } from 'react';
import {  Modal } from 'antd';
import OverSetForm, { OverSetFormProps } from './form/overset-tenant-form';

export interface OverSetProps extends OverSetFormProps {
  oversold?: any;
  data?: any;
  visible?: boolean;
  submit?: (value: any) => void;
  onClose?: () => void;
  getOverSold: (name: string) => void;
}

class OverSet extends PureComponent<OverSetProps, any> {
  static readonly defaultProps = {
    submit: () => null
  };

  state = {
    loading: false,
  }
  UNSAFE_componentWillReceiveProps({ data, oversold }: OverSetProps) {
    if (!!data.name && this.props.data.name !== data.name) {
      this.props.getOverSold(data.name);
    }
  }

  componentDidMount() {
    const { data, getOverSold } = this.props;
    data.name && getOverSold(data.name);
  }

  render() {
    const { visible, data, oversold, submit, onClose } = this.props;
    const { loading } = this.state;
    const over_set = oversold[data.name];
    return (
      <Modal
        maskClosable={false}
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
        <OverSetForm ref="overset" over_set={over_set} />
      </Modal>
    )
  }
}

export default OverSet;