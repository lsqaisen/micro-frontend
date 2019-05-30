import { PureComponent, Fragment } from 'react';
import { Form, Drawer, Button, PageHeader, Empty, Row, Col, List, Typography, Divider } from 'antd';
import FormInput, { FormInputProps, FormInputItem } from '@/components/global/forminput';
import ArrayInput from '@/components/global/forminput/array-input';
import { HostMount } from '@/services/app';
import HostMountInput from './host-mount-input';
import styles from '../style/index.less';

export interface AddHostMountsProps extends FormInputProps<HostMount[]> {
  type?: 'create' | 'update' | 'edit';
}

const Grid = ({ isContent, style, data = {} as HostMount }: any) => (
  <Row gutter={8} style={style}>
    <Col span={19}><Typography.Text>{isContent ? data.mountPath : '挂载路径'}</Typography.Text></Col>
    <Col span={5}><Typography.Text>{isContent ? data.readOnly ? '只读' : '读写' : '读写权限'}</Typography.Text></Col>
  </Row>
)

@(FormInput({
  name: 'hostMounts',
  onValuesChange: ({ onChange }, _, allValues) => {
    onChange(allValues.hostMounts)
  }
}) as any)
class AddHostMounts extends PureComponent<AddHostMountsProps, any> {
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
              }}>添加本地挂载卷</a>
              {(value! || []).length > 0 && <div style={{ marginTop: 8, padding: 8, backgroundColor: '#F7F7F7' }}>
                <Grid />
              </div>}
            </Fragment>
          )}
          footer={(
            <Drawer
              title="本地挂载卷"
              width={482}
              placement="right"
              onClose={this._onClose}
              visible={visible}
            >
              <Form>
                <FormInputItem>
                  {getFieldDecorator('hostMounts', {
                    initialValue: value || [],
                    rules: [],
                  })(
                    <ArrayInput<HostMount>
                      allList={value || []}
                      input={HostMountInput}
                      btnText="添加本地挂载卷"
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

          dataSource={(value || [])}
          renderItem={(hostMount: HostMount) => (
            <List.Item>
              <Grid style={{ padding: `0 8px`, width: `calc(100% + 8px)` }} isContent data={hostMount} />
            </List.Item>
          )}
        />
      </FormInputItem>
    )
  }
}

export default AddHostMounts;