import { PureComponent } from 'react';
import { Form, Row, Col, Radio, Input } from 'antd';
import FormInput, { FormInputProps } from '@/components/global/forminput';
import SearchSelect from '@/components/global/search-select';
import { Scheduler } from '@/services/apps';
import { getResourceRequest } from '@/services/resource';
import { getNodesRequest } from '@/services/node';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

export interface SchedulerSearchHandles {
  onNodeSearch: (search: getNodesRequest) => any;
  onResourceSearch: (search: getResourceRequest) => any;
}

export interface SchedulerInputProps extends FormInputProps<Scheduler>, SchedulerSearchHandles { }

@(FormInput({ name: 'scheduler' }) as any)
class SchedulerInput extends PureComponent<SchedulerInputProps, any> {
  static readonly defaultProps: SchedulerInputProps = {
    form: {} as any,
    value: {
      type: 'none',
    } as any,
    onChange: (values?: any) => null,
    onNodeSearch: (values: getNodesRequest) => null,
    onResourceSearch: (values: getResourceRequest) => null,
  }
  render() {
    const { value, form, onChange, onResourceSearch, onNodeSearch } = this.props;
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
              <RadioGroup onChange={(v) => {
                onChange!({ type: v.target.value, resource: undefined, tenant: undefined, hostname: undefined });
              }}>
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
                    onSearch={(params: any = {}) => {
                      return new Promise(async (resolve, reject) => {
                        let response: any[] = await onResourceSearch!(params);
                        resolve({
                          data: response.map(v => ({
                            key: v.name,
                            label: `${v.name}<${v.hostIPS[0].address}>`,
                          })),
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
                  onSearch={(params: any = {}) => {
                    const { page = 1, itemsPerPage = 10 }: any = params;
                    let request: getNodesRequest = { page, itemsPerPage };
                    return new Promise(async (resolve, reject) => {
                      let { data, total }: any = await onNodeSearch!(request);
                      resolve({
                        data: data.map((node: any) => ({
                          key: `${node.name}`,
                          label: `${node.name}<${node.hostIPS[0].address}>`
                        })),
                        params: total <= itemsPerPage * page ? null : {
                          page: page + 1,
                          itemsPerPage,
                        }
                      })
                    })
                  }}
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