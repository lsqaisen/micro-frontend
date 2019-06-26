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
import menus from '@/menus';

@(withRouter as any)
@connect(createSelector(
  [
    (props: any) => (props.user || {}).profile,
    (props: any) => (props.user || {}).init,
    (props: any) => (props.user || {}).admin,
    (props: any) => props.menu,
  ],
  (profile, init, admin, menu) => ({ profile, init, admin, menu })
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
  updateMenus = (menu: any) => {
    return this.props.dispatch({
      type: 'menu/update',
      payload: menu,
    })
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    if (window.web_type === 'plugin') { }
    else {
      sub(`/lib/login/login.js?${new Date().getTime()}`, 'login', () => {
        this.setState({ init: true })
      });
      sub(`/lib/dashboard/dashboard.js?${new Date().getTime()}`, 'dashboard', () => {
        console.info('load dashoard success')
        this.updateMenus(window.mife_menus!.dashboard)
      });
      sub(`/lib/tenant/tenant.js?${new Date().getTime()}`, 'tenant', () => {
        console.info('load tenant success', window.mife_menus)
        this.updateMenus(window.mife_menus!.tenant)
      });
      sub(`/lib/auth/auth.js?${new Date().getTime()}`, 'auth', () => {
        console.info('load tenant success', window.mife_menus)
        this.updateMenus(window.mife_menus!.auth)
      });
    }
  }
  render() {
    const { version, admin, profile, init, menu, location, children } = this.props;
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
                      guestName={''}
                      name={profile.username}
                      admin={admin}
                      logout={this.logout}
                    />
                    <div style={{ height: 'calc(100% - 212px)' }}>
                      <Menu
                        selectedKeys={[location.pathname]}
                        data={menu.filter((v: any) => !!v.childs && v.childs.length > 0).map(({ key, name, childs }: any) => ({
                          key,
                          type: 'group',
                          component: name,
                          childs: childs
                            .filter((child: any) => child[admin ? `admin` : `user`])
                            .map((child: any) => {
                              if (Array.isArray(child.childs) && child.childs.length > 0) {
                                return {
                                  type: 'subitem',
                                  key: child.path,
                                  component: <React.Fragment>
                                    <i className={`icon iconfont icon-${child.key}`} />
                                    <span className="name">{child.name}</span>
                                  </React.Fragment>,
                                  childs: child.childs.filter((_child: any) => _child[admin ? `admin` : `user`]).map((_child: any) => ({
                                    type: 'item',
                                    key: `${child.path}${_child.path}`,
                                    component: <Link to={`${child.path}${_child.path}`}>
                                      <i className={`icon iconfont icon-${_child.key}`} />
                                      <span className="name">{_child.name}</span>
                                    </Link>
                                  }))
                                }
                              } else {
                                return {
                                  type: 'item',
                                  key: child.path,
                                  component: <Link to={child.path}>
                                    <i className={`icon iconfont icon-${child.key}`} />
                                    <span className="name">{child.name}</span>
                                  </Link>
                                }
                              }
                            }),
                        }))}
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