import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import List from '@/components/repositories/tags/';

@connect(createSelector(
  [
    ({ [`${MODEL}_list`]: list }: any) => list.data,
    props => !!props.loading.effects[`${MODEL}_list/get`],
  ],
  (data, loading) => ({ data, loading })
), createSelector(
  [
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_list/get`, payload: data }),
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_list/create`, payload: data }),
  ],
  (get, createTenant) => ({ get, createTenant })
))
export default class extends PureComponent<any, any> {
  static readonly defaultProps = {
    routes: [{
      path: '/dashboard',
      breadcrumbName: '总览',
    }]
  };

  state = {
    page: 1,
    page_size: 10,
  };

  get = () => {
    const { page, page_size } = this.state;
    this.props.get({ page, page_size })
  };

  componentDidMount() {
    this.get();
  }

  render() {
    const { data, users, routes, loading } = this.props;
    return (
      <List />
    )
  }
}