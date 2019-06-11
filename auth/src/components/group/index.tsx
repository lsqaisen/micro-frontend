import { PureComponent } from 'react';
import { Menu, Icon, Modal } from 'antd';
import router from 'umi/router';
import QueueAnim from 'rc-queue-anim';
import ScrollBar from 'react-perfect-scrollbar';
// import { addStackRequest } from '@/services/stack';
import styles from './style/index.less';

const { ItemGroup } = Menu;

export type StackProps = {
  data: any[];
  stackName?: string;
  onAdd?: (value: any) => void;
  onDelete?: (name: string) => void;
}

class Stack extends PureComponent<StackProps, any> {
  static readonly defaultProps: StackProps = {
    data: []
  }
  setStack = (stackName?: string) => {
    router.push(`/stack/${stackName}`);
  }
  UNSAFE_componentWillReceiveProps({ data, stackName }: StackProps) {
    if (data.length > 0) {
      if (!data.find(v => v.name === stackName)) {
        this.setStack((data || [])[0].name)
      }
    } else {
      this.setStack('')
    }
  }
  componentDidMount() {
    const { stackName, data } = this.props;
    if (!data.find(v => v.name === stackName) && data.length > 0) {
      this.setStack((data || [])[0].name)
    } else if (data.length <= 0) {
      this.setStack('')
    }
  }
  render() {
    const { stackName, data, onAdd, onDelete } = this.props;
    return (
      <div className={styles.menu_box}>
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
              selectedKeys: [stackName],
              onClick: (e: any) => this.setStack(e.key)
            }}
            animConfig={[
              { opacity: [1, 0], translateX: [0, -250] },
              { opacity: [1, 0], translateX: [0, 250] },
            ]}
          >
            <ItemGroup key="stack" title="应用栈列表">
              {data.map((v: any) => (
                <Menu.Item key={v.name}>
                  {v.name}
                  <a
                    href="#"
                    style={{ position: 'absolute', top: 0, right: 0 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      Modal.confirm({
                        title: `确认是否需要删除应用栈${v.name}?`,
                        content: v.desc,
                        okText: '确认',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk() {
                          return new Promise(async (resolve, reject) => {
                            const error: any = await onDelete!(v.name);
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

export default Stack;