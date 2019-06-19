import { PureComponent } from 'react';
import { Button, Drawer } from 'antd';
import SetQuotaForm from './form/set-tenant-quota-form'

export interface SetTenantQuotaProps {
  visible?: boolean;
  data?: any;
  quotas?: any;
  submit?: (value: any) => void;
  getQuota?: (value: any) => void;
  onClose?: () => void;
}

class SetTenantQuota extends PureComponent<SetTenantQuotaProps, any> {
  static readonly defaultProps = {
    submit: () => null,
    getQuota: () => null,
    onClose: () => null,
  };

  state = {
    loading: false,
  }

  UNSAFE_componentWillReceiveProps({ visible, data }: SetTenantQuotaProps) {
    if (visible && !!data.name && this.props.data.name !== data.name) {
      this.props.getQuota!(data.name);
    }
  }

  componentDidMount() {
    const { data, getQuota } = this.props;
    data.name && getQuota!(data.name);
  }

  render() {
    const { visible, quotas, data, onClose, submit } = this.props;
    const { loading } = this.state;
    const quota = quotas[data.name] || {};
    return (
      <Drawer
        bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
        destroyOnClose
        maskClosable={false}
        title="设置默认配额"
        width={482}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <SetQuotaForm data={quota} ref="setquotaform" />
        <div className={"drawer-bottom-actions"} >
          <Button onClick={onClose} style={{ marginRight: 8 }}> 取消 </Button>
          <Button loading={loading} onClick={() => {
            (this.refs.setquotaform as any).validateFields(async (error: any, values: any) => {
              if (!error) {
                this.setState({ loading: true })
                let r: any = { namespace: data.name };
                Object.entries(values).forEach(([key, value]) => r[key] = `${value}`)
                if ((await submit!(r)) as any) {
                } else {
                  onClose!();
                }
                this.setState({ loading: false })
              }
            })
          }} type="primary"> 提交 </Button>
        </div>
      </Drawer >
    )
  }
}

export default SetTenantQuota;