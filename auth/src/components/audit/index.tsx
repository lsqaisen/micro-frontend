import * as React from 'react';
import { PureComponent } from 'react';
import { PageHeader } from 'antd';
import Link from 'umi/link';

export type AuditProps = {
  name?: string,
  desc?: string,
  routes?: any[];
}

class Audit extends PureComponent<AuditProps, any> {
  static readonly defaultProps = {
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }, {
      path: '/auth/config',
      breadcrumbName: '审计日志',
    }],
  }

  render() {
    const { name, desc, routes, children } = this.props;
    return (
      <PageHeader
        style={{ minHeight: '100vh' }}
        title={name}
        subTitle={desc}
        breadcrumb={{
          routes,
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

export default Audit;