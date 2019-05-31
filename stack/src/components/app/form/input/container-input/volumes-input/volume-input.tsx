import { PureComponent } from 'react';
import { Form, Row, Col, Select, Radio, Input } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Volume } from '@/services/app';

const Option = Select.Option;
const FormItem = Form.Item;

export interface VolumeChildInputProps<T> extends FormInputProps<T> {
  stateful: "none" | "share" | "exclusive";
}

export interface VolumeInputProps extends VolumeChildInputProps<Volume> {

}

class ReadOnlyRadio extends PureComponent<any, any> {
  render() {
    const { onChange, ...props } = this.props;
    return (
      <Radio {...props} onClick={() => onChange(!props.checked)}>只读</Radio>
    )
  }
}

@(FormInput({ name: 'volume-child' }) as any)
class VolumeChildInput<T> extends PureComponent<VolumeChildInputProps<T>, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {},
    onChange: () => null,
  }
  render() {
    const { stateful, value, form } = this.props;
    const { readOnly, mountPath, claimName, pvcpool } = value! as any;
    const { getFieldDecorator } = form;
    return (
      <Row gutter={8}>
        <Col span={9}>
          <FormItem>
            {getFieldDecorator(stateful === 'share' ? 'claimName' : 'pvcpool', {
              initialValue: stateful === 'share' ? claimName : pvcpool,
              rules: [{ required: true, message: '必须选择' }],
            })(
              <SearchSelect
                placeholder={stateful === "share" ? "数据卷" : "数据卷组"}
                style={{ width: '100%' }}
                onSearch={() => {
                  return new Promise(async (resolve, reject) => {
                    resolve({
                      data: [{
                        key: '34345',
                        label: '345345345'
                      }],
                      params: undefined,
                    })
                  })
                }}
              />
            )}
          </FormItem>
        </Col>
        <Col span={10}>
          <FormItem>
            {getFieldDecorator('mountPath', {
              initialValue: mountPath,
              rules: [{
                required: true, message: '不能为空'
              }, {
                pattern: /(\/([0-9a-zA-Z]+))+/, message: '路径格式有误'
              }],
            })(
              <Input placeholder="挂载路径" />
            )}
          </FormItem>
        </Col>
        <Col span={5}>
          <FormItem>
            {getFieldDecorator('readOnly', {
              initialValue: readOnly,
              valuePropName: 'checked'
            })(
              <ReadOnlyRadio>只读</ReadOnlyRadio>
            )}
          </FormItem>
        </Col>
      </Row >
    )
  }
}

@(FormInput({ name: 'volume' }) as any)
class VolumeInput extends PureComponent<VolumeInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
  }

  render() {
    const { stateful, value, form } = this.props;
    const { persistentVolumeClaim, volumeClaimTemplate } = value! || {} as Volume;
    const { getFieldDecorator } = form;
    if (stateful === 'share') {
      return (
        <FormInputItem>
          {getFieldDecorator('persistentVolumeClaim', {
            initialValue: persistentVolumeClaim,
            rules: [],
          })(
            <VolumeChildInput stateful={stateful} />
          )}
        </FormInputItem>
      )
    } else {
      return (
        <FormInputItem>
          {getFieldDecorator('volumeClaimTemplate', {
            initialValue: volumeClaimTemplate,
            rules: [],
          })(
            <VolumeChildInput stateful={stateful} />
          )}
        </FormInputItem>
      )
    }
  }
}

export default VolumeInput;