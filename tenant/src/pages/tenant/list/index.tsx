import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Breadcrumb from '@/components/global/breadcrumb';
import Table from '@/components/tenant/table';
import AddTenant from '@/components/tenant/add-tenant';
import Overset from '@/components/tenant/overset';
import Actions from './basic/actions';


@connect(createSelector(
  [
    ({ [`${MODEL}_tenant`]: tenant }: any) => tenant.data,
    ({ [`${MODEL}_tenant`]: tenant }: any) => (tenant.users || {}).list || [],
    props => !!props.loading.effects[`${MODEL}_tenant/get`],
  ],
  (data, users, loading) => ({ data, users, loading })
), createSelector(
  [
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/get`, payload: data }),
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/create`, payload: data }),
    (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/getusers`, payload: { group_id: "*" } }),
  ],
  (getTenants, createTenant, getUsers) => ({ getTenants, createTenant, getUsers })
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

  componentDidMount() {
    const { page, page_size } = this.state;
    this.props.getTenants({ page, page_size });
  }

  render() {
    const { data, routes, loading, getTenants, createTenant, getUsers } = this.props;
    const { page, page_size } = this.state;
    return (
      <Breadcrumb
        name="空间列表"
        routes={routes.concat([{
          path: `/tenant/list`,
          breadcrumbName: '空间列表',
        }])}
      >
        <section className="box">
          <header style={{ overflow: 'hidden' }}>
            <div className="fr">
              <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={() => getTenants({ page, page_size })} >刷新</Button>
            </div>
            <div className="fr">
              <AddTenant
                submit={(v) => createTenant(v).then((err: any) => {
                  if (!err) getTenants({ page, page_size });
                })}
                userSearch={() => {
                  return new Promise(async (resolve) => {
                    getUsers().then(() => {
                      const { users } = this.props;
                      resolve(users.filter((user: any) => user.type !== 1));
                    });
                  })
                }}
              />
            </div>
          </header>
          <Table
            loading={loading}
            data={data}
            actions={<Actions update={() => getTenants({ page, page_size })} />}
          >
            <Overset key="overset" />
          </Table>
        </section>
      </Breadcrumb>
    )
  }
}