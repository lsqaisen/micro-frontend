import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddStackForm from './form/add-stack-form';
import { createStackRequest } from '@/services/stack';
import styles from './style/index.less';

export interface AddStackProps {
  btn?: React.ReactNode;
  onSubmit?: (value: createStackRequest) => void
}

class AddStack extends PureComponent<AddStackProps, any> {
  static readonly defaultProps: AddStackProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, onSubmit } = this.props;
    const { loading, visible } = this.state;
    return (
      <div className={styles.add_stack}>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加应用栈 <Icon type="plus" />
        </Button>}
        <Drawer
          title="添加集群"
          width={482}
          placement="left"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddStackForm ref="addstack" />
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addstack as any).validateFields(async (error: any, values: createStackRequest) => {
                if (!error) {
                  this.setState({ loading: true })
                  if ((await onSubmit!({ ...values, ippool: values.ippool === "none" ? undefined : values.ippool })) as any) {
                    this.setState({ loading: false })
                  } else {
                    this.setState({ visible: false, loading: false })
                  }
                }
              })
            }} type="primary"> 提交 </Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default AddStack;