import { PureComponent, Fragment } from 'react';
import { List, Button, Row, Col, Typography, PageHeader } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import { Container } from '@/services/apps';
import ContainerInput, { AddContainerProps } from './container';
import PercentInput from '../input/container-input/percent-input';

interface KeyContainer extends Container {
  key: string;
}

export interface AddContainersProps extends AddContainerProps {
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
class AddContainers extends PureComponent<FormInputProps<KeyContainer[]> & AddContainersProps, any> {
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
    value[index] = { ...value[index], ...v };
    setFieldsValue({
      action: {
        type: 'modify',
        value,
      },
    })
  }

  changePercent = (index: any, { cpuPercent, memPercent }: Container) => {
    const { value: _value, form: { setFieldsValue } } = this.props;
    let value: Container[] = [].concat(_value as any);
    value[index] = { ...value[index], cpuPercent, memPercent };
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
    const {
      type, stateful, value, form,
      onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch
    } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { keys: initialValue } = this.state;
    getFieldDecorator('keys', { initialValue });
    getFieldDecorator('action', { initialValue: { type: '', value: null } });
    const keys = getFieldValue('keys');
    console.log(value)
    return (
      <Fragment>
        <List
          itemLayout="vertical"
          dataSource={keys}
          renderItem={(key: number, index) => (
            <FormInputItem required>
              {getFieldDecorator(`container_${key}`, {
                initialValue: value![index],
                rules: []
              })(
                <ContainerInput
                  onChange={(value) => this.change(key, value)}
                  canDelete={value!.length > 1}
                  onDelete={() => this.remove(key)}
                  {...{ stateful, onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch }}
                />
              )}
            </FormInputItem>
          )}
          footer={<Button style={{ width: "100%" }} type="dashed" onClick={this.add}>添加应用</Button>}
        />
        <PageHeader
          className="box"
          style={{ margin: `16px 0` }}
          title="资源配比"
          subTitle="配置容器资源占用"
        >
          <List
            itemLayout="vertical"
            dataSource={keys}
            header={(
              <Row gutter={8}>
                <Col span={8}><Typography.Text>容器名称</Typography.Text></Col>
                <Col span={8}><Typography.Text>CPU配比</Typography.Text></Col>
                <Col span={8}><Typography.Text>内存配比</Typography.Text></Col>
              </Row>
            )}
            renderItem={(key: number, index) => (
              <FormInputItem required>
                {getFieldDecorator(`percent_${key}`, {
                  initialValue: value![index],
                  rules: []
                })(
                  <PercentInput others={value!.filter((v, i) => {
                    console.log(i, index)
                    return i !== index
                  })} name={value![index].name} onChange={(value) => this.changePercent(key, value)} />
                )}
              </FormInputItem>
            )}
          />
        </PageHeader>
      </Fragment>
    )
  }
}

export default AddContainers;