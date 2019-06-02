import { PureComponent } from 'react';
import { Form, Drawer, Button, PageHeader, Collapse, Icon, List } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/app';
import ContainerInput from './add-container';

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

  onValuesChange: ({ value: __value, onChange }: any, changeValues: any) => {
    const { type, value }: any = changeValues.action || {};
    switch (type) {
      case 'add':
        onChange(__value.concat(value));
        break;
      case 'modify':
        onChange(value);
        break;
      case 'remove':
        let _value = [].concat(__value);
        _value.splice(value, 1);
        onChange(_value);
        break;
      default:
        break;
    }
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
    keys: [],
  }

  remove = (k: any) => {
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    if (keys.length === 0) {
      return;
    }
    setFieldsValue({
      keys: keys.filter((key: any) => key !== k),
      action: {
        type: 'remove',
        value: keys.findIndex((key: any) => key === k),
      }
    });
  }

  add = () => {
    uuid++;
    const { form: { getFieldValue, setFieldsValue } } = this.props;
    const keys = getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    setFieldsValue({
      keys: nextKeys,
      action: {
        type: 'add',
        value: [new Object({} as Container)]
      }
    });
  }

  change = (index: any, v: Container) => {
    const { value: _value, form: { setFieldsValue } } = this.props;
    let value: Container[] = [].concat(_value as any);
    value[index] = v;
    setFieldsValue({
      action: {
        type: 'modify',
        value,
      },
    })
  }

  getValues = () => {
    const { form: { getFieldsValue } } = this.props;
    let value = getFieldsValue() || {};
    delete value.keys;
    delete value.action;
    return value;
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({
      keys: Object.keys(value!).map(key => parseInt(key, 10)),
    });
  }

  render() {
    const { type, value, form } = this.props;
    const { getFieldsError, getFieldDecorator, getFieldValue } = form;
    const { keys: initialValue } = this.state;
    const errors = Object.values(getFieldsError() || {}).filter(v => !!v).map(error => (error || []).join(',')).join(';');
    getFieldDecorator('keys', { initialValue });
    getFieldDecorator('action', { initialValue: { type: '', value: null } });
    const keys = getFieldValue('keys');
    console.log(errors, 34234234, getFieldsError())
    return (
      <List
        itemLayout="vertical"
        dataSource={keys}
        renderItem={(key: number, index) => (
          <FormInputItem required>
            {getFieldDecorator(`container_${key}`, {
              initialValue: value![index],
              rules: []
            })(
              <ContainerInput />
            )}
          </FormInputItem>
        )}
      />
    )
  }
}

export default AddContainers;