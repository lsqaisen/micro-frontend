import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddAppForm from './form/add-app-form/';
import { createStackRequest } from '@/services/stack';
import styles from './style/index.less';

export interface AddAppProps {
  btn?: React.ReactNode;
  onSubmit?: (value: createStackRequest) => void
}

class AddApp extends PureComponent<AddAppProps, any> {
  static readonly defaultProps: AddAppProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: true,
  }

  render() {
    const { btn, onSubmit } = this.props;
    const { loading, visible } = this.state;
    return (
      <div>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            <Icon type="plus" /> 添加应用栈
        </Button>}
        <Drawer
          bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
          title="添加服务"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddAppForm ref="addapp" />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addapp as any).validateFieldsAndScroll(async (error: any, values: createStackRequest) => {
                console.log(values)
                if (!error) {
                  // this.setState({ loading: true })
                  // if ((await onSubmit!({ ...values, ippool: values.ippool === "none" ? undefined : values.ippool })) as any) {
                  //   this.setState({ loading: false })
                  // } else {
                  //   this.setState({ visible: false, loading: false })
                  // }
                }
              })
            }} type="primary"> 提交 </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default AddApp;