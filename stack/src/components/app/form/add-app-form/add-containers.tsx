import { PureComponent } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, List } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/app';
import ContainersInput from '../input/container-input';

export interface AddContainersProps extends FormInputProps<Container[]> {
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

@(FormInput({ name: 'containers' }) as any)
class AddContainers extends PureComponent<AddContainersProps, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
    formItemLayout: {
      labelCol: { xs: 24, md: 5 },
      wrapperCol: { xs: 24, md: 19 },
    }
  };

  state = {
    visible: true,
  }

  _onClose = (e: any) => {
    if (!!e) e.preventDefault();
    (this.props.form as any).validateFields(async (error: any, values: any) => {
      if (!error) {
        this.setState({
          visible: false,
        })
      }
    })
  }


  render() {
    const { type, value, form } = this.props;
    const { getFieldsError, getFieldDecorator } = form;
    const { visible } = this.state;
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    return (
      <PageHeader
        className="box"
        style={{ padding: 16, marginBottom: 8, borderRadius: "8px", border: errors ? '1px solid #ff5242' : '1px solid transparent' }}
        title="容器配置"
        subTitle="服务的容器配置信息"
        extra={[
          <a key="edit" onClick={(e) => {
            e.preventDefault();
            this.setState({ visible: true });
          }}>添加</a>
        ]}
        footer={(
          <Drawer
            title="容器配置"
            width={482}
            placement="right"
            onClose={this._onClose}
            visible={visible}
          >
            <Form>
              <FormInputItem required>
                {getFieldDecorator('containers', {
                  initialValue: value || [],
                  rules: []
                })(
                  <ContainersInput />
                )}
              </FormInputItem>
            </Form>
            <div className={"node-actions"} >
              <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
              <Button onClick={this._onClose} type="primary"> 确认 </Button>
            </div>
          </Drawer>
        )}
      >
        {(value || []).length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={(value || [])}
            renderItem={(cntr: Container) => (
              <List.Item actions={[<a>edit</a>, <a>delete</a>]}>
                <List.Item.Meta
                  title={cntr.name}
                  description={`镜像:${cntr.image}`}
                />
                <div>content</div>
              </List.Item>
            )}
          />
        ) : (
            <Empty description="未配置容器" >
              <Button type="primary" onClick={() => this.setState({ visible: true })}>立即添加</Button>
            </Empty>
          )}
      </PageHeader>
    )
  }
}

export default AddContainers;