import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddProjectForm, { ProjectFromProps } from './form/add-project-form';
import { createProjectRequest } from '@/services/projects';

export interface AddProjectProps extends ProjectFromProps {
  btn?: React.ReactNode;
  submit?: (value: createProjectRequest) => void;
}

class AddProject extends PureComponent<AddProjectProps, any> {
  static readonly defaultProps = {
    submit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { btn, submit, userSearch } = this.props;
    const { loading, visible } = this.state;
    return (
      <div>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加镜像仓库 <Icon type="plus" />
          </Button>}
        <Drawer
          maskClosable={false}
          title="添加镜像仓库"
          width={482}
          placement="right"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddProjectForm ref="createproject" userSearch={userSearch} />
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.createproject as any).validateFields(async (error: any, values: createProjectRequest) => {
                console.log(values)
                values.owner_id = Number(values.owner_id);
                values.user_ids = (values.user_ids || []).map(v => Number(v));
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
      </div>
    )
  }
}

export default AddProject;