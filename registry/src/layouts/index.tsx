import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { createSelector } from 'reselect';
import { LocaleProvider, Divider } from 'antd';
import Media from 'react-media';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'config';
import withRouter from 'umi/withRouter';
import { Layout, Menu, Logo } from 'library';
import User from '../../../.library/src/user/';
import menus from '@/menus';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}),
  ],
  ({ profile, init, admin }) => ({ profile, init, admin })
))
export default class extends PureComponent<any, any> {
  state = {
    init: false,
  }
  logout = () => {
    return this.props.dispatch({
      type: 'user/logout'
    })
  }
  modifyPassword = (value: any) => {
    return this.props.dispatch({
      type: 'user/modify',
      payload: value
    })
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    sub(`/service/login/lib/login/login.js?${new Date().getTime()}`, 'login', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { version, profile, admin, init, children } = this.props;
    if (!init) return null;
    else if (!profile) {
      return children
    } else {
      return (
        <Media query="(min-width: 599px)">
          {(matches) => (
            <LocaleProvider locale={zhCN}>
              <Layout
                level={0}
                state='centent'
                matches={!matches}
                width={256}
                sider={(
                  <div style={{ height: '100%' }}>
                    <section style={{ height: 64, padding: 8 }}>
                      <Logo
                        iconSrc={`/static/bin/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/icon.png`}
                        logoSrc={`/static/bin/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/logo.png`}
                      />
                    </section>
                    <Divider style={{ margin: 0, marginBottom: 0 }} />
                    <User
                      project={profile.current}
                      projects={profile.projects}
                      guestName=""
                      name={profile.username}
                      admin={admin}
                      logout={this.logout}
                    >
                      <User.ModifyPassword key="modify-password" username={profile.username} submit={this.modifyPassword} />
                      <div>sdfsfd</div>
                    </User>
                    <div style={{ height: 'calc(100% - 212px)' }}>
                      {/* <Menu
                        selectedKeys={[location.pathname]}
                        data={[{
                          type: 'group',
                          key: '0',
                          component: '控制台',
                          childs: [{
                            type: 'item',
                            key: '/dashboard',
                            component: <Link to="/dashboard">
                              <i className='icon iconfont icon-dashboard' />
                              <span className="name">概览</span>
                            </Link>
                          }, {
                            type: 'group',
                            key: '1',
                            component: '配置与运维',
                            childs: menus.childs.map(menu => ({
                              type: 'item',
                              key: `/${MODEL}${menu.path}`,
                              component: <Link to={`/${MODEL}${menu.path}`}>
                                <i className={`icon iconfont icon-tenant`} />
                                <span className="name">{menu.name}</span>
                              </Link>
                            }))
                          }]
                        }]}
                      /> */}
                    </div>
                    <div style={{ lineHeight: '32px', textAlign: 'center', borderTop: '1px solid #f8f8f8' }}>{version} build {process.env.VERSION}</div>
                  </div>
                )}>
                {/* {children} */}
              </Layout>
            </LocaleProvider>
          )}
        </Media>
      )
    }
  }
}