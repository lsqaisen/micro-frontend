import * as React from 'react';
import { PureComponent } from 'react';
import { PageHeader } from 'antd';
import Link from 'umi/link';

export type UserProps = {
  name: string,
  desc?: string,
  routes?: any[];
}

class User extends PureComponent<UserProps, any> {
  static readonly defaultProps = {
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }, {
      path: '/auth/user',
      breadcrumbName: '所有用户',
    }]
  }

  render() {
    const { name, desc, routes, children } = this.props;
    return (
      <PageHeader
        style={{ minHeight: '100%' }}
        title={name}
        subTitle={desc}
        breadcrumb={{
          routes: routes!.concat(name ? [{
            path: `/stack/${name}`,
            breadcrumbName: name,
          }] : []),
          itemRender(route, _, routes) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
          }
        }}
      >
        {children}
      </PageHeader>
    )
  }
}

export default User;

