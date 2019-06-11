import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { createSelector } from 'reselect';
import { LocaleProvider, Divider } from 'antd';
import Media from 'react-media';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import Layout from '@/components/global/layout';
import Menu from '@/components/global/menu';
import Logo from '@/components/global/logo';
import SiderUser from '@/components/global/sider-user';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
  ],
  (profile, init) => ({ profile, init })
))
export default class extends PureComponent<any, any> {
  state = {
    init: false,
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    sub(`/lib/login/login.js?${process.env.VERSION}`, 'login', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { version, profile, init, location, children } = this.props;
    console.log(profile)
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
                width={246}
                header={(
                  <SiderUser
                    name={profile.username}
                    admin={profile.userType === 1}
                  />
                )}
                sider={(
                  <React.Fragment>
                    <section style={{ height: 64, padding: 8 }}>
                      <Logo
                        iconSrc={`/static/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/icon.png`}
                        logoSrc={`/static/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/logo.png`}
                      />
                    </section>
                    <Divider style={{ margin: 0, marginBottom: 0 }} />
                    <SiderUser
                      name={profile.username}
                      admin={profile.userType === 1}
                    />
                    <div style={{ height: 'calc(100% - 180px)' }}>
                      <Menu
                        width={246}
                        selectedKeys={[location.pathname]}
                        data={[{
                          type: 'group',
                          key: '0',
                          component: '控制台',
                          childs: [{
                            type: 'item',
                            key: '/dashboard',
                            component: <Link to="/dashboard">概览</Link>
                          }]
                        }, {
                          type: 'group',
                          key: '1',
                          component: '资源与数据',
                          childs: [{
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }, {
                            type: 'item',
                            key: '/auth/user',
                            component: <Link to="/auth/user">
                              <i className='icon iconfont icon-auth' />
                              <span className="name">应用栈</span>
                            </Link>
                          }, {
                            type: 'item',
                            key: '/auth/config',
                            component: <Link to="/auth/config">系统设置</Link>
                          }, {
                            type: 'item',
                            key: '/auth/log',
                            component: <Link to="/auth/log">审计日志</Link>
                          }]
                        }]}
                      />
                    </div>
                    <div style={{ lineHeight: '32px', textAlign: 'center', borderTop: '1px solid #f8f8f8' }}>{version} build {process.env.VERSION}</div>
                  </React.Fragment>
                )}>
                {children}
              </Layout>
            </LocaleProvider>
          )}
        </Media>
      )
    }
  }
}