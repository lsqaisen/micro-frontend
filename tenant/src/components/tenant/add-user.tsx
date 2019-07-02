import { PureComponent, cloneElement, Fragment } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddUserForm from './form/user-form';

export interface AddUserProps {
  btn?: React.ReactNode;
  submit?: (value: any) => any;
  callback?: (value: any) => void;
}

class AddUser extends PureComponent<AddUserProps, any> {
  static readonly defaultProps = {
    submit: () => null,
    callback: () => null,
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, submit, callback } = this.props;
    const { loading, visible } = this.state;
    console.log(submit)
    return (
      <Fragment>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button style={{ width: '100%' }} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加用户 <Icon type="plus" />
          </Button>}
        <Drawer
          destroyOnClose
          maskClosable={false}
          title="添加用户"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddUserForm ref="adduser" />
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.adduser as any).validateFields(async (error: any, values: any) => {
                if (!error) {
                  this.setState({ loading: true })
                  const { data, err } = await submit!(values);
                  if (err) {
                    this.setState({ loading: false });
                  } else {
                    callback!(data);
                    this.setState({ visible: false, loading: false });
                  }
                }
              })
            }} type="primary"> 提交 </Button>
          </div>
        </Drawer>
      </Fragment>
    )
  }
}

export default AddUser;