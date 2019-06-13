import { PureComponent, Fragment } from 'react';
import { Icon, Modal, Tooltip } from 'antd';
import router from 'umi/router';
import CreateGroup, { AddGroupProps } from './add-group';
import GMenu from '@/components/global/menu';

export interface GroupProps extends AddGroupProps {
  data: any[];
  group_id?: string;
  onAdd?: (value: any) => void;
  onDelete?: (group_id: string) => void;
}

class Group extends PureComponent<GroupProps, any> {
  static readonly defaultProps = {
    data: []
  }
  setGroup = (group_id?: string) => {
    router.push(`/auth/user?group=${group_id}`);
  }
  UNSAFE_componentWillReceiveProps({ data, group_id }: GroupProps) {
    if (data.length > 0 && group_id !== "*") {
      if (!data.find(v => `${v.group_id}` === group_id)) {
        this.setGroup('*')
      }
    } else if (data.length <= 0 && group_id !== "*") {
      this.setGroup('*')
    }
  }
  componentDidMount() {
    const { group_id, data } = this.props;
    if (data.length > 0 && group_id !== "*" && !data.find(v => `${v.group_id}` === group_id)) {
      this.setGroup("*")
    } else if (data.length <= 0 && group_id !== "*") {
      this.setGroup('*')
    }
  }
  render() {
    const { group_id, data, namespace, admin, privilege, onAdd, onDelete, onUserSearch } = this.props;
    return (
      <Fragment>
        <CreateGroup  {...{ namespace, admin, privilege, onUserSearch }} onSubmit={onAdd!} />
        <div style={{ height: 'calc(100% - 80px)' }}>
          <GMenu
            selectedKeys={[`${group_id}`]}
            onClick={(e: any) => this.setGroup(e.key)}
            data={[{
              type: 'group',
              key: '1',
              component: '用户列表',
              childs: [{
                type: 'item',
                key: '*',
                component: '所有用户',
              }]
            }, {
              type: 'group',
              key: '2',
              component: '权限组',
              childs: data.map((v: any) => ({
                type: 'item',
                key: `${v.group_id}`,
                component: <Fragment>
                  {(v.name.split(":") || []).slice(1).join(':')}
                  {!v.is_builtin && (
                    <Tooltip title="删除">
                      <a
                        href="#"
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          Modal.confirm({
                            title: `确认是否需要删除用户权限组${v.name}?`,
                            content: v.description,
                            okText: '确认',
                            okType: 'danger',
                            cancelText: '取消',
                            onOk() {
                              return new Promise(async (resolve, reject) => {
                                const error: any = await onDelete!(v.group_id);
                                if (!error) {
                                  resolve()
                                } else {
                                  reject(error)
                                }
                              })
                            },
                          })
                        }}>
                        <Icon type="close" />
                      </a>
                    </Tooltip>
                  )}
                </Fragment>
              }))
            }]}
          />
        </div>
      </Fragment>
    )
  }
}

export default Group;
