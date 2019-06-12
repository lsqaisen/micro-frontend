import { PureComponent } from 'react';
import { Menu, Icon, Modal } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import ScrollBar from 'react-perfect-scrollbar';
import CreateGroup, { AddGroupProps } from './add-group';
// import { addGroupRequest } from '@/services/stack';
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
    router.push(`/auth/user?group=${group_id}`);
  }
  UNSAFE_componentWillReceiveProps({ data, group_id }: GroupProps) {
    if (data.length > 0) {
      if (!data.find(v => `${v.group_id}` === group_id)) {
        this.setGroup((data || [])[0].group_id)
      }
    } else {
      this.setGroup('')
    }
  }
  componentDidMount() {
    const { group_id, data } = this.props;
    if (!data.find(v => `${v.group_id}` === group_id) && data.length > 0) {
      this.setGroup((data || [])[0].group_id)
    } else if (data.length <= 0) {
      this.setGroup('')
    }
  }
  render() {
    const { group_id, data, namespace, admin, privilege, onAdd, onDelete } = this.props;
    return (
      <div className={styles.menu_box}>
        <CreateGroup  {...{ namespace, admin, privilege }} onSubmit={onAdd!} />
        <ScrollBar
          options={{
            suppressScrollX: true,
          }}
        >
          <QueueAnim
            component={Menu}
            componentProps={{
              mode: "inline",
              style: { height: '100%' },
              selectedKeys: [group_id],
              onClick: (e: any) => this.setGroup(e.key)
            }}
            animConfig={[
              { opacity: [1, 0], translateX: [0, -250] },
              { opacity: [1, 0], translateX: [0, 250] },
            ]}
          >
            <ItemGroup key="stack" title="应用栈列表">
              {data.map((v: any) => (
                <Menu.Item key={`${v.group_id}`}>
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
                </Menu.Item>
              ))}
            </ItemGroup>
          </QueueAnim>
        </ScrollBar>
      </div >
    )
  }
}

export default Group;