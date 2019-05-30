import { PureComponent } from 'react';
import { Form, Row, Col, Radio, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Scheduler } from '@/services/app';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export interface SchedulerInputProps extends FormInputProps<Scheduler> { }

@(FormInput({ name: 'scheduler' }) as any)
class SchedulerInput extends PureComponent<SchedulerInputProps, any> {
  static readonly defaultProps = {
    form: {} as any,
    value: {
      type: 'none',
    } as any
  }
  render() {
    const { value, form } = this.props;
    const { type, tenant, resource, hostname } = value as Scheduler;
    const { getFieldDecorator } = form;
    return (
      <Row>
        <Col style={{ float: 'left', width: '140px' }}>
          <FormItem>
            {getFieldDecorator('type', {
              initialValue: type,
              rules: [{ required: true }],
            })(
              <RadioGroup>
                <Radio value="none">自动调度</Radio>
                <Radio value="resource">指定资源池</Radio>
                <Radio value="node">指定私有主机</Radio>
              </RadioGroup>
            )}
          </FormItem>
        </Col>
        <Col style={{ float: 'left', width: 'calc(100% - 140px)' }}>
          {type === 'resource' ? (
            <>
              <FormItem style={{ display: 'none' }}>
                {getFieldDecorator('tenant', {
                  initialValue: tenant,
                  rules: [{ required: true }],
                })(
                  <Input placeholder="工作空间" disabled />
                )}
              </FormItem>
              <FormItem style={{ marginTop: '39px' }}>
                {getFieldDecorator('resource', {
                  initialValue: resource,
                  rules: [{ required: true, message: '资源池必须选择！' }],
                })(
                  <SearchSelect
                    placeholder="选择资源池"
                    style={{ width: '100%' }}
                    onSearch={() => { 
                      return new Promise(async (resolve, reject) => {
                        resolve({
                          data:[{
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
            </>
          ) : type === 'node' ? (
            <FormItem style={{ marginTop: '78px' }}>
              {getFieldDecorator('hostname', {
                initialValue: hostname,
                rules: [{ required: true, message: '主机必须选择！' }],
              })(
                <SearchSelect
                  placeholder="选择主机"
                  style={{ width: '100%' }}
                  onSearch={() => { }}
                />
              )}
            </FormItem>
          ) : null}
        </Col>
      </Row>
    )
  }
}

export default SchedulerInput;