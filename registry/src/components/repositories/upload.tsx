import { PureComponent, Fragment, cloneElement } from 'react';
import { Button, Drawer, Icon } from 'antd';
import UploadRepositoyForm, { UploadRepositoyFormProps } from './form/upload-repositoy-form';

export interface UploadRepositoyProps extends UploadRepositoyFormProps {
  btn?: React.ReactNode;
  submit?: (value: any) => void;
}

class UploadRepositoy extends PureComponent<UploadRepositoyProps, any> {
  static readonly defaultProps = {
    submit: () => null,
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { admin, namespace, username, btn, submit, searchProjects } = this.props;
    const { loading, visible } = this.state;
    return (
      <Fragment>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>
            上传镜像 <Icon type="plus" />
          </Button>}
        <Drawer
          bodyStyle={{ overflow: 'auto', height: 'calc(100% - 110px)' }}
          maskClosable={false}
          title="上传镜像"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <UploadRepositoyForm ref="createtenant" {...{ admin, namespace, username, searchProjects }} />
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.createtenant as any).validateFields(async (error: any, values: any) => {
                if (!error) {
                  this.setState({ loading: true })
                  if ((await submit!(values)) as any) {
                    this.setState({ loading: false })
                  } else {
                    this.setState({ visible: false, loading: false })
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

export default UploadRepositoy;