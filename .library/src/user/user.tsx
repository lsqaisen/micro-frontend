import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { Avatar, Tag, Icon, Typography, Dropdown, Menu, Descriptions } from 'antd';
import ModifyPassword from './modify-password'
import styles from './style/index.less';

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
type colorType = (typeof colorList)[number];

type UserProps = {
  name: string;
  guestName: string;
  trial: boolean;
  admin: boolean;
  project: string;
  projects: any[];
  changeProject: (project: string) => void;
  logout: () => void;
  modifyPassword: (value: any) => void;
}

type UserState = {
  color?: colorType;
}

class User extends PureComponent<UserProps, UserState> {
  static ModifyPassword: typeof ModifyPassword;
  static readonly defaultProps = {
    trial: true,
    projects: [],
    changeProject: () => null,
    logout: () => null,
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
    const { name, trial, admin, guestName, project, projects, logout, modifyPassword } = this.props;
    const { color } = this.state;
    return (
      <div className={`${styles.box}`}>
        <Menu selectedKeys={[]}>
          <Menu.SubMenu title={(
            <Fragment>
              <Avatar className={styles.avatar} style={{ backgroundColor: color }} icon="user" />
              <Typography.Text style={{ marginLeft: 8, verticalAlign: 'middle' }} strong>
                <Tag style={{ padding: '0 5px' }} color={admin ? "red" : "#286cff"}>{admin ? '管理员' : '平台用户'}</Tag>
                <Typography.Text>{name}</Typography.Text>
              </Typography.Text>
            </Fragment>
          )} >
            <Menu.Item onClick={() => {
              let btn = document.getElementById('modify_password_btn');
              if (btn) (btn as any).click();
            }}>
              <Icon type="lock" />
              <span>修改密码</span>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={logout}>
              <Icon type="logout" />
              <span>退出</span>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Divider />
          <Menu.Item>
            <Descriptions className={styles.namespace}>
              <Descriptions.Item label="工作空间">
                {projects.length ? <Dropdown placement="bottomRight" overlay={(
                  <Menu selectedKeys={[project]}>
                    {projects.map(_project => (
                      <Menu.Item style={{ width: 180 }} key={_project.name}>
                        <a href="#" onClick={(e) => {
                          e.preventDefault();
                          const { project, changeProject } = this.props;
                          project !== _project.name && changeProject(_project.name || '')
                        }}>
                          {project}
                        </a>
                      </Menu.Item>
                    ))}
                  </Menu>
                )}>
                  <a className="ant-dropdown-link" href="#" >
                    <Typography.Text style={{ float: "left", color: 'inherit', width: 'calc(100% - 14px)' }} ellipsis>
                      {project}
                    </Typography.Text>
                    <Icon style={{ display: "inline-block" }} type="down" />
                  </a>
                </Dropdown> : project}
              </Descriptions.Item>
            </Descriptions>
          </Menu.Item>
        </Menu>
        <ModifyPassword
          username={name}
          submit={modifyPassword}
          btn={<span id="modify_password_btn" style={{ display: 'none' }} />}
        />
      </div>
    )
  }
}

export default User;