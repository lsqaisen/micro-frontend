import { PureComponent, Fragment } from 'react';
import { PageHeader, Avatar, Tag, Icon, Typography, Dropdown, Menu, Divider, Popover, Descriptions } from 'antd';
import GMenu from '@/components/global/menu';
import styles from './style/user.less';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
type colorType = (typeof colorList)[number];

type UserProps = {
  name: string;
  guestName: string;
  trial: boolean;
  admin: boolean;
}

type UserState = {
  color?: colorType;
}

export default class extends PureComponent<UserProps, UserState> {
  static readonly defaultProps = {
    trial: true,
  }
  state = {
    color: colorList[parseInt(`${Math.random() * 10}`) % 4]
  }
  UNSAFE_componentWillReceiveProps(nextProps: UserProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        color: colorList[parseInt(`${Math.random() * 10}`) % 4],
      });
    }
  }
  render() {
    const { name, trial, admin, guestName, children } = this.props;
    const { color } = this.state;
    return (
      <section
        className={styles.user_box}
      >
        <Popover
          className={styles.avatar_box}
          placement="rightTop"
          content={(
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                  1st menu itemxxxxxxxxxx
          </a>
              </Menu.Item>
            </Menu>
          )}
        >
          <div>
            <Avatar style={{ backgroundColor: color }} icon="user" />
            <Typography.Text style={{marginLeft: 8, verticalAlign: 'middle' }} strong>
              <Tag style={{ padding: '0 5px' }} color={admin ? "red" : "#286cff"}>{admin ? '管理员' : '平台用户'}</Tag>
              <Typography.Text>{name}</Typography.Text>
            </Typography.Text>
          </div>
          <div className={styles.right_icon}>
            <Icon type="right" />
          </div>
        </Popover>
        {/* <GMenu
          width={240}
          selectedKeys={[]}
          data={[{
            type: 'subitem',
            key: 'usersub',
            component: (
              <Typography.Text style={{ verticalAlign: 'middle' }} strong>
                <Tag style={{ padding: '0 5px' }} color={admin ? "red" : "#286cff"}>{admin ? '管理员' : '平台用户'}</Tag>
                <Typography.Text>{name}</Typography.Text>
              </Typography.Text>
            ),
            childs: [{
              type: 'item',
              key: '1',
              component: <a>用户列表</a>
            }]
          }]}
        /> */}

        <Descriptions className={styles.namespace}>
          <Descriptions.Item label="工作空间">
            <Dropdown overlay={(
              <Menu>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
              </a>
                </Menu.Item>
              </Menu>
            )}>
              <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
              </a>
            </Dropdown>
          </Descriptions.Item>
        </Descriptions>
      </section>
    )
    return (
      <div className={styles.user_box}>
        <PageHeader title="Title">
          <div className="wrap">
            {/* <div className="content">{content}</div>
            <div className="extraContent">{extraContent}</div> */}
          </div>
        </PageHeader>
        <div>
          <section className={styles.avatar_box}>
            <Avatar
              className="box"
              style={{ padding: 8, verticalAlign: 'middle', borderRadius: '100%' }}
              src={`/static/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/icon.png`}
              size={50}>
              {name}
            </Avatar>
          </section>
          <section className={styles.info_box} >
            <Typography.Paragraph style={{ margin: '4px 0' }} strong>{name}</Typography.Paragraph>
            <Tag style={{ padding: '0 5px' }} color={admin ? "#286cff" : "red"}>{admin ? '管理用户' : '平台用户'}</Tag>
          </section>
        </div>
        <div>
          <Typography.Paragraph style={{ margin: '4px 0' }}>
            <Typography.Text>工作空间：</Typography.Text>
            <Dropdown overlay={(
              <Menu>
                <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    1st menu item
              </a>
                </Menu.Item>
              </Menu>
            )}>
              <a className="ant-dropdown-link" href="#">
                Hover me <Icon type="down" />
              </a>
            </Dropdown>
          </Typography.Paragraph>
        </div>
        {/* <div style={{ float: 'left', marginLeft: 16 }}>
          <p style={{ fontWeight: 500, fontSize: '16px', lineHeight: '18px' }}>{name}</p>
          <p style={{ color: "#8C92A2", lineHeight: '20px', fontSize: '12px' }}>
            {!trial ? <Fragment>{guestName}</Fragment> : "免费试用"}
          </p>
          <Tag style={{ height: '18px', padding: '0 5px' }} color={admin ? "#2D225A" : "red"}>{admin ? '平台用户' : '管理用户'}</Tag>
        </div> */}
        {/* <div className='tl'>
          <Icon type="right" />
        </div> */}
      </div>
    )
  }
}