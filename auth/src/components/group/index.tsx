import { PureComponent, Fragment } from 'react';
import { Menu, Icon, Modal } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import ScrollBar from 'react-perfect-scrollbar';
import CreateGroup, { AddGroupProps } from './add-group';
// import { addGroupRequest } from '@/services/stack';
import GMenu from '@/components/global/menu';
import styles from './style/index.less';

const { ItemGroup } = Menu;

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
    console.log(group_id)
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
    const { group_id, data, namespace, admin, privilege, onAdd, onDelete } = this.props;
    return (
      <Fragment>
        <CreateGroup  {...{ namespace, admin, privilege }} onSubmit={onAdd!} />
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
                {v.name}
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
              </Fragment>
            }))
          }]}
        />
      </Fragment>
    )
  }
}

export default Group;
