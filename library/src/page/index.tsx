import * as React from 'react';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';
import Link from 'umi/link';

export interface PageProps extends PageHeaderProps {
  link?: false;
  routes?: any[];
}

class Page extends React.PureComponent<PageProps, any> {
  static readonly defaultProps = {
    link: true,
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }]
  }

  render() {
    const { link, className, routes, children, ...props } = this.props;
    return (
      <PageHeader
        {...props}
        className={`${className || ''}`}
        breadcrumb={{
          routes,
          itemRender(route, _, routes) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last || !link ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
          }
        }}
      >
        {children}
      </PageHeader>
    )
  }
}

export default Page;