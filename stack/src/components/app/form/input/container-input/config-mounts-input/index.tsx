import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, Row, Col, List, Typography } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import ArrayInput from '@/components/global/forminput/array-input';
import { Mount } from '@/services/app';
import MountInput from './config-mount-input';
import styles from '../style/index.less';

export interface AddConfigMountsProps extends FormInputProps<Mount[]> {
  type?: 'create' | 'update' | 'edit';
}

const Grid = ({ style, data = {} as Mount }: any) => (
  <Row gutter={8} style={style}>
    <Col span={5}><Typography.Text >{data.name || '配置名称'}</Typography.Text></Col>
    <Col span={5}><Typography.Text >{data.key || '配置项'}</Typography.Text></Col>
    <Col span={7} offset={1}><Typography.Text >{data.mountPath || '挂载路径'}</Typography.Text></Col>
    <Col span={5} offset={1}><Typography.Text >{data.path || '指定挂载名称'}</Typography.Text></Col>
  </Row>
)

@(FormInput({
  name: 'configMounts',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.configMounts)
  }
}) as any)
class AddConfigMounts extends PureComponent<AddConfigMountsProps, any> {
  static readonly defaultProps = {
    form: {},
    type: 'create',
    value: [],
    onChange: () => null,
  };

  state = {
    visible: false,
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
      <FormInputItem
        required
        validateStatus={errors ? 'error' : 'success'}
        help={errors}
      >
        <List
          className={styles.box}
          locale={{
            emptyText: null
          }}
          header={(
            <Fragment>
              <a key="add" onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true });
              }}>添加配置挂载</a>
              {(value! || []).length > 0 && <div style={{ marginTop: 8, padding: 8, backgroundColor: '#F7F7F7' }}>
                <Grid />
              </div>}
            </Fragment>
          )}
          footer={(
            <Drawer
              title="端口映射"
              width={482}
              placement="right"
              onClose={this._onClose}
              visible={visible}
            >
              <Form>
                <FormInputItem>
                  {getFieldDecorator('configMounts', {
                    initialValue: value! || [],
                    rules: [],
                  })(
                    <ArrayInput<MountInput>
                      input={MountInput}
                      btnText="添加环境变量"
                      header={<Grid />}
                    />
                  )}
                </FormInputItem>
              </Form>
              <div className={"node-actions"} >
                <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
                <Button onClick={this._onClose} type="primary"> 确认 </Button>
              </div>
            </Drawer>
          )}

          dataSource={value! || []}
          renderItem={(mount: Mount) => (
            <List.Item>
              <Grid style={{ width: `calc(100% + 8px)` }} data={mount} />
            </List.Item>
          )}
        />
      </FormInputItem>
    )
  }
}

export default AddConfigMounts;