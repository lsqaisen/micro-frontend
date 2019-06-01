import { PureComponent } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, List } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/app';
import ContainersInput from '../input/container-input';

interface KeyContainer extends Container {
  key: string;
}

export interface AddContainersProps extends FormInputProps<KeyContainer[]> {
  type?: 'create' | 'update' | 'edit';
  formItemLayout?: any;
}

let uuid = 0;

@(FormInput({
  name: 'containers',
  onValuesChange: ({ value, onChange }, _, changeValue) => {
    console.log(value, changeValue)
    const { container, container_key, action } = changeValue;
    let _value: any[] = [].concat(value || []);
    if (action == 'add' || action == 'modify') {
      const i = _value.findIndex((v: any) => {
        console.log(v.container_key, container_key)
        return v.container_key === container_key;

      });
      console.log(i, 13)
      if (i !== -1) {
        _value[i] = { container_key, ...container };
      } else {
        _value.push({ container_key, ...container })
      }
    } else if (action === 'delete') {
      const i = _value.findIndex((v: any) => v.container_key === container_key);
      _value.splice(i, 1);
    }
    onChange(_value)
  }
}) as any)
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
    visible: false,
  }

  _onClose = (e: any) => {
    if (!!e) e.preventDefault();
    (this.props.form as any).validateFieldsAndScroll(async (error: any, values: any) => {
      if (!error) {
        this.setState({
          visible: false,
        })
      }
    })
  }

  add = (e?: any) => {
    e && e.preventDefault();
    this.props.form.resetFields();
    this.props.form.setFieldsValue({
      action: 'add',
      container_key: `container_${uuid++}`,
    })
    this.setState({ visible: true });
  }

  render() {
    const { type, value, form } = this.props;
    const { getFieldsError, getFieldDecorator } = form;
    const { visible } = this.state;
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    getFieldDecorator(`action`);
    getFieldDecorator(`container_key`);
    console.log(value, 111)
    return (
      <FormInputItem
        style={{ marginBottom: 8 }}
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors}
      >
        <PageHeader
          className="box"
          style={{ padding: 16, marginBottom: 8, borderRadius: "8px", border: errors ? '1px solid #ff5242' : '1px solid transparent' }}
          title="容器配置"
          subTitle="服务的容器配置信息"
          extra={[
            <a key="edit" onClick={this.add}>添加</a>
          ]}
          footer={(
            <Drawer
              title="容器配置"
              bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
              width={482}
              placement="right"
              onClose={this._onClose}
              visible={visible}
            >
              <Form style={{ padding: 24, height: "100%", overflow: "auto" }}>
                <FormInputItem required>
                  {getFieldDecorator(`container`, {
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
            null
            // <List
            //   itemLayout="horizontal"
            //   dataSource={(value || [])}
            //   renderItem={(cntr: Container) => (
            //     <List.Item actions={[<a>edit</a>, <a>delete</a>]}>
            //       <List.Item.Meta
            //         title={cntr.name}
            //         description={`镜像:${cntr.image}`}
            //       />
            //       <div>content</div>
            //     </List.Item>
            //   )}
            // />
          ) : (
              <Empty description="未配置容器" >
                <Button type="primary" onClick={this.add}>立即添加</Button>
              </Empty>
            )}
        </PageHeader>
      </FormInputItem>
    )
  }
}

export default AddContainers;