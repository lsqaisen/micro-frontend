import * as React from 'react';
import { PageHeader } from 'antd';
import { PageHeaderProps } from 'antd/lib/page-header';

export interface PageProps extends PageHeaderProps {
  link?: React.ReactNode;
  routes?: any[];
}

class Page extends React.PureComponent<PageProps, any> {
  static readonly defaultProps = {
    link: ({ route }: any) => <span>{route.breadcrumbName}</span>,
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }]
  }

  render() {
    const { link, className, routes, children, ...props } = this.props;
    console.log(link)
    return (
      <PageHeader
        {...props}
        className={`${className || ''}`}
        breadcrumb={{
          routes,
          itemRender(route, _, routes) {
            const last = routes.indexOf(route) === routes.length - 1;
            return last ? <span>{route.breadcrumbName}</span> : React.cloneElement(link as any, { route });
          }
        }}
      >
        {children}
      </PageHeader>
    )
  }
}

export default Page;