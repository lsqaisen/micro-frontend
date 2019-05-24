import * as React from 'react';
import { PureComponent, Fragment } from 'react';
import { PageHeader, Icon } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Link } from 'dva/router';
import Table from '@/components/global/table';
import EllipsisTooltip from '@/components/global/ellipsis-tooltip';


export type ListProps = {
  name: string,
  desc?: string,
  routes?: any[];
}

class List extends PureComponent<ListProps, any> {
  static readonly defaultProps = {
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }, {
      path: '/stack',
      breadcrumbName: '应用栈列表',
    }]
  }

  render() {
    const { name, desc, routes, children } = this.props;
    console.log(name)
    return (
      <PageHeader
        title={name}
        subTitle={desc}
        breadcrumb={{
          routes: routes!.concat([{
            path: `/stack/${name}`,
            breadcrumbName: name,
          }]),
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

export default List;

