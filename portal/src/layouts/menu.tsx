import { PureComponent } from 'react';
import { connect } from 'dva';
import Menu from '@/components/layouts/sider/menu';
import { createSelector } from 'reselect';

@connect(createSelector(
  [
    (props: any) => props.mife_menus,
  ],
  (menus) => ({ menus })
))
export default class extends PureComponent<any, any> {
  render() {
    return (
      <Menu />
    )
  }
}


