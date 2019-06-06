import { PureComponent } from 'react';
import { Form, Row, Col, Select, Radio, Input } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Volume } from '@/services/apps';

const Option = Select.Option;
const FormItem = Form.Item;

export interface VolumeSearchHandles {
  onPvcPoolSearch: () => any;
  onPvcSearch: () => any;
}

export interface VolumeChildInputProps<T> extends FormInputProps<T>, VolumeSearchHandles {
  stateful: "none" | "share" | "exclusive";
}

export interface VolumeInputProps extends VolumeChildInputProps<Volume> { }

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
    const { stateful, value, form, onPvcPoolSearch, onPvcSearch } = this.props;
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
                onSearch={(params: any = {}) => {
                  if (stateful === 'share') {
                    return new Promise(async (resolve, reject) => {
                      let response: any[] = await onPvcSearch!();
                      resolve({
                        data: response.filter((pvc: any) => !pvc.metadata.labels.tag)
                          .map((pvc: any) => ({
                            key: `${JSON.stringify({
                              name: pvc.metadata.name,
                              readOnly: pvc.spec.accessModes.indexOf("ReadOnlyMany") !== -1,
                            })}`,
                            label: `${pvc.metadata.name}${pvc.usedby.count > 0 ? `(被使用)` : ''}`,
                          })),
                        params: null
                      })
                    })
                  } else {
                    return new Promise(async (resolve, reject) => {
                      let response: any[] = await onPvcPoolSearch!();
                      resolve({
                        data: response.map(pvcpool => ({
                          disabled: pvcpool.Used,
                          key: `${JSON.stringify({
                            name: pvcpool.label,
                            readOnly: pvcpool.AccessModes === "ReadOnlyMany"
                          })}`,
                          label: `${pvcpool.label}${pvcpool.Used ? `(被使用)` : ''}`
                        })),
                        params: null
                      })
                    })
                  }
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
    const { stateful, value, form, onPvcPoolSearch, onPvcSearch } = this.props;
    const { persistentVolumeClaim, volumeClaimTemplate } = value! || {} as Volume;
    const { getFieldDecorator } = form;
    if (stateful === 'share') {
      return (
        <FormInputItem>
          {getFieldDecorator('persistentVolumeClaim', {
            initialValue: persistentVolumeClaim,
            rules: [],
          })(
            <VolumeChildInput {...{ stateful, onPvcPoolSearch, onPvcSearch }} />
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
            <VolumeChildInput {...{ stateful, onPvcPoolSearch, onPvcSearch }} />
          )}
        </FormInputItem>
      )
    }
  }
}

export default VolumeInput;