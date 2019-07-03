import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddTenantForm, { TenantFromProps } from './form/add-tenant-form';
import { createTenantRequest } from '@/services/tenant';

export interface AddTenantProps extends TenantFromProps {
  btn?: React.ReactNode;
  submit?: (value: createTenantRequest) => void;
}

class AddTenant extends PureComponent<AddTenantProps, any> {
  static readonly defaultProps = {
    submit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, submit, userSearch, createUser } = this.props;
    const { loading, visible } = this.state;
    return (
      <div>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加工作空间 <Icon type="plus" />
          </Button>}
        <Drawer
          maskClosable={false}
          title="添加工作空间"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddTenantForm ref="createtenant" userSearch={userSearch} createUser={createUser}/>
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.createtenant as any).validateFields(async (error: any, values: createTenantRequest) => {
                console.log(values)
                values.owner_id = Number(values.owner_id);
                values.user_ids = (values.user_ids || []).map(v => Number(v));
                if (!error) {
                  this.setState({ loading: true })
                  if ((await submit!(values)) as any) {
                    this.setState({ loading: false })
                  } else {
                    this.setState({ visible: false, loading: false })
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

export default AddTenant;