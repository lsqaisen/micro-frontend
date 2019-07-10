import * as React from 'react';
import { PageHeaderProps } from 'antd/lib/page-header';
export interface PageProps extends PageHeaderProps {
    link?: React.ReactNode;
    routes?: any[];
}
declare class Page extends React.PureComponent<PageProps, any> {
    static readonly defaultProps: {
        routes: {
            path: string;
            breadcrumbName: string;
        }[];
    };
    render(): JSX.Element;
}
export default Page;
