import { PureComponent, Fragment } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddResourceForm from './form/add-resource-form';
import { createResourceRequest } from '@/services/resource';

export interface AddResourceProps {
  onSubmit?: (value: createResourceRequest) => void
}

class AddResource extends PureComponent<AddResourceProps, any> {
  static readonly defaultProps: AddResourceProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { onSubmit } = this.props;
    const { loading, visible } = this.state;
    return (
      <Fragment>
        <Button ghost type="primary" onClick={() => { this.setState({ visible: true }) }}>
          <Icon type="plus" /> 添加资源池
        </Button>
        <Drawer
          title="添加资源池"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddResourceForm ref="addresource" />
          <div className="node-actions" >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addresource as any).validateFields(async (error: any, values: createResourceRequest) => {
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
      </Fragment>
    )
  }
}

export default AddResource;