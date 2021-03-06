import { PureComponent, Fragment } from 'react';
import { Icon, Button, Drawer } from 'antd';
import JoinResourceForm, { JosinResourceFormProps } from './form/join-resource-form';
import { joinResourceRequest } from '@/services/resource';

export interface JoinResourceProps extends JosinResourceFormProps {
  onSubmit?: (value: joinResourceRequest) => void
}

class JoinResource extends PureComponent<JoinResourceProps, any> {
  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { onSubmit, ...joinResourceFormProps } = this.props;
    const { loading, visible } = this.state;
    return (
      <Fragment>
        <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>
          添加节点 <Icon type="plus" />
        </Button>
        <Drawer
          title="添加节点"
          destroyOnClose
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}

        >
          <JoinResourceForm
            ref="joinresource"
            {...joinResourceFormProps}
          />
          <div className="drawer-bottom-actions" >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.joinresource as any).validateFields(async (error: any, values: joinResourceRequest) => {
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

export default JoinResource;