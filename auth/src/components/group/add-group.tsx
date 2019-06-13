import { PureComponent, cloneElement } from 'react';
import { Icon, Button, Drawer } from 'antd';
import AddGroupForm, { GroupFromProps } from './form/add-group-form';
import { addGroupRequest } from '@/services/group';
import { transition } from '@/components/privilege/table';
import styles from './style/index.less';

export interface AddGroupProps extends GroupFromProps {
  btn?: React.ReactNode;
  onSubmit?: (value: addGroupRequest) => void;
}

class AddGroup extends PureComponent<AddGroupProps, any> {
  static readonly defaultProps = {
    onSubmit: () => null
  };

  state = {
    loading: false,
    visible: false,
  }

  render() {
    const { namespace, admin, privilege, btn, onSubmit, onUserSearch } = this.props;
    const { loading, visible } = this.state;
    return (
      <div className={styles.add_group}>
        {btn ? cloneElement(btn as any, {
          onClick: () => { this.setState({ visible: true }) }
        }) : <Button className={styles.btn} type="primary" onClick={() => { this.setState({ visible: true }) }}>
            添加权限组 <Icon type="plus" />
          </Button>}
        <Drawer
          maskClosable={false}
          title="添加用户权限组"
          width={482}
          placement="left"
          onClose={() => { this.setState({ visible: false }) }}
          visible={visible}
        >
          <AddGroupForm ref="addgroup" {...{ namespace, admin, privilege, onUserSearch }} />
          <div className={"drawer-bottom-actions"} >
            <Button onClick={() => { this.setState({ visible: false }) }} style={{ marginRight: 8 }}> 取消 </Button>
            <Button loading={loading} onClick={() => {
              (this.refs.addgroup as any).validateFields(async (error: any, values: addGroupRequest) => {
                let privileges = values.privileges.filter(v => typeof v === "number");
                let _privileges = values.privileges.filter(v => typeof v !== "number");
                let data = transition(privilege);
                _privileges.forEach(_v => {
                  let d = data.find(v => `${v.key}` === `${_v}`);
                  privileges = privileges.concat(d!.children!.map(v => Number(v.key)))
                })
                values.privileges = privileges;
                if (admin) {
                  values.name = `ekos:system:${values.name}`;
                  values.project = "*"
                } else {
                  values.name = `ekos:${namespace}:${values.name}`;
                  values.project = namespace;
                }
                values.users = values.users!.map(v => Number(v))
                if (!error) {
                  this.setState({ loading: true })
                  if ((await onSubmit!(values)) as any) {
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

export default AddGroup;