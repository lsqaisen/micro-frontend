import * as React from 'react';
import { PureComponent } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { createSelector } from 'reselect';
import { LocaleProvider, Divider, message, Modal } from 'antd';
import Media from 'react-media';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { sub, unsub } from 'mife/bin/api';
import withRouter from 'umi/withRouter';
import Layout from '@/components/global/layout';
import Menu from '@/components/global/menu';
import Logo from '@/components/global/logo';
import SiderUser from '@/components/global/sider-user';
import menus from '@/menus';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
    (props: any) => (props.user || {}).admin,
  ],
  (profile, init, admin) => ({ profile, init, admin })
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
    sub(`/lib/login/login.js?${new Date().getTime()}`, 'login', () => {
      this.setState({ init: true })
    });
  }
  render() {
    const { version, admin, profile, init, location, children } = this.props;
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
                sider={(
                  <div style={{ height: '100%' }}>
                    <section style={{ height: 64, padding: 8 }}>
                      <Logo iconSrc={`/static/oem/icon.png`} logoSrc={`/static/oem/logo.png`} />
                    </section>
                    <Divider style={{ margin: 0, marginBottom: 0 }} />
                    <SiderUser
                      name={profile.username}
                      admin={profile.userType === 1}
                    />
                    <div style={{ height: 'calc(100% - 212px)' }}>
                      <Menu
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
                            childs: menus[admin ? `admin` : `user`].map(menu => ({
                              type: 'item',
                              key: `/${MODEL}${menu.path}`,
                              component: <Link to={`/${MODEL}${menu.path}`}>
                                <i className={`icon iconfont icon-tenant`} />
                                <span className="name">{menu.name}</span>
                              </Link>
                            }))
                          }]
                        }]}
                      />
                    </div>
                    <div style={{ lineHeight: '32px', textAlign: 'center', borderTop: '1px solid #f8f8f8' }}>{version} build {process.env.VERSION}</div>
                  </div>
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