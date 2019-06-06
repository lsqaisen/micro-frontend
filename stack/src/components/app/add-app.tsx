import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddAppForm, { AddAppFormProps } from './form/add-app-form/';
import { createAppRequest } from '@/services/apps';
import styles from './style/index.less';

export interface AddAppProps extends AddAppFormProps {
  btn?: React.ReactNode;
  onSubmit?: (value: createAppRequest) => any;
}

class AddApp extends PureComponent<AddAppProps, any> {
  static readonly defaultProps = {
    onSubmit: () => null,
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, onSubmit, onNodeSearch, onResourceSearch, onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch } = this.props;
    const { loading, visible } = this.state;
    return (
      <div>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            <Icon type="plus" /> 添加应用栈
        </Button>}
        <Drawer
          maskClosable={false}
          destroyOnClose
          bodyStyle={{ padding: 0, height: `calc(100% - 108px)` }}
          title="添加服务"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddAppForm
            ref="addapp"
            {...{ onNodeSearch, onResourceSearch, onImageSearch, onImageTagSearch, onSecretSearch, onCfgfileSearch, onPvcPoolSearch, onPvcSearch }}
          />
          <div className={"node-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addapp as any).validateFieldsAndScroll(async (error: any, values: any) => {
                if (!error) {
                  const data: createAppRequest = { ...values.basic, containers: values.containers, service: values.service };
                  this.setState({ loading: true })
                  if (await onSubmit!(data)) {
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

export default AddApp;