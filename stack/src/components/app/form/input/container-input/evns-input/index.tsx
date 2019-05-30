import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, Row, Col, List, Typography, Divider } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import ArrayInput from '@/components/global/forminput/array-input';
import { Env } from '@/services/app';
import EnvInput from './env-input';
import styles from './style/index.less';

export interface AddEvnsProps extends FormInputProps<Env[]> {
  type?: 'create' | 'update' | 'edit';
}

const Grid = ({ style, env = {} }: any) => (
  <Row gutter={8} style={style}>
    <Col span={10}><Typography.Text>{env.name || '变量名'}</Typography.Text></Col>
    <Col span={13} offset={1}><Typography.Text>{env.value || '值'}</Typography.Text></Col>
  </Row>
)

@(FormInput({
  name: 'envs',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.envs)
  }
}) as any)
class AddEvns extends PureComponent<AddEvnsProps, any> {
  static readonly defaultProps = {
    form: {},
    value: [],
    type: 'create',
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
          className={styles.envs}
          locale={{
            emptyText: null
          }}
          header={(
            <Fragment>
              <a key="add" onClick={(e) => {
                e.preventDefault();
                this.setState({ visible: true });
              }}>编辑</a>
              {(value! || []).length <= 0 ? <Fragment>
                <Divider type="vertical" />
                <a key="load" onClick={(e) => {
                  e.preventDefault();
                  this.setState({ visible: true });
                }}>读取配置</a>
              </Fragment> :
                <div style={{ marginTop: 8, padding: 8, backgroundColor: '#F7F7F7' }}>
                  <Grid />
                </div>}
            </Fragment>
          )}
          footer={(
            <Drawer
              title="环境变量"
              width={482}
              placement="right"
              onClose={this._onClose}
              visible={visible}
            >
              <Form>
                <FormInputItem>
                  {getFieldDecorator('envs', {
                    initialValue: value!,
                    rules: [],
                  })(
                    <ArrayInput<Env>
                      input={EnvInput}
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
          dataSource={(value! || [])}
          renderItem={(env: Env) => (
            <List.Item>
              <Grid style={{ padding: `0 8px`, width: 'calc(100% + 8px)' }} env={env} />
            </List.Item>
          )}
        />
      </FormInputItem>
    )
  }
}

export default AddEvns;