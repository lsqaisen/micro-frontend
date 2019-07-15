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
import { Layout, Logo, Menu, User } from 'library';

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
  getPlugins = () => {
    return this.props.dispatch({
      type: 'menu/getPlugins',
    })
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
  updateMenus = (menu: any) => {
    return this.props.dispatch({
      type: 'menu/updateMenus',
      payload: menu,
    })
  }
  updateLoad = (load: any) => {
    return this.props.dispatch({
      type: 'menu/updateLoad',
      payload: load,
    })
  }
  UNSAFE_componentWillReceiveProps({ profile, init }: any) {
    if (!!init && !!profile) {
      let loader = document.getElementById('loader');
      if (loader) loader.remove();
    }
  }
  componentDidMount() {
    const { menu: { load } } = this.props;
    !load.login && sub(`/service/login/lib/login/login.js?${process.env.VERSION}`, 'login', () => this.updateLoad({ login: true }));
    if (!window.___plugins) {
      !load.plugin && sub(`/service/plugin/lib/plugin/plugin.js?${process.env.VERSION}`, 'plugin', () => {
        this.updateLoad({ plugin: true })
        this.updateMenus(window.mife_menus!.plugin)
      });
      !load.dashboard && sub(`/service/dashboard/lib/dashboard/dashboard.js?${process.env.VERSION}`, 'dashboard', () => {
        this.updateLoad({ dashboard: true })
        this.updateMenus(window.mife_menus!.dashboard)
      });
      this.getPlugins().then((error: any) => {
        if (!error) {
          const { menu: { plugins } } = this.props;
          plugins.forEach(({ spec: { id } }: any) => {
            !load[id] && sub(`/service/${id}/lib/${id}/${id}.js?${process.env.VERSION}`, id, () => {
              this.updateLoad({ [id]: true })
              this.updateMenus(window.mife_menus![id])
            });
          })
        }
      })
    } else if (Array.isArray(window.___plugins)) {
      window.___plugins.forEach((plugin: any) => {
        !load[plugin] && sub(`/service/${plugin}/lib/${plugin}/${plugin}.js?${process.env.VERSION}`, plugin, () => {
          this.updateLoad({ [plugin]: true })
          this.updateMenus(window.mife_menus![plugin])
        });
      })
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
                    />
                    <div style={{ height: 'calc(100% - 212px)' }}>
                      <Menu
                        selectedKeys={[location.pathname]}
                        data={menu.menus.filter((v: any) => !!v.childs && v.childs.length > 0).map(({ key, name, childs }: any) => ({
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
                {/* {children} */}
              </Layout>
            </LocaleProvider>
          )}
        </Media>
      )
    }
  }
}