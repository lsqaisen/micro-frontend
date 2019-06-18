import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Breadcrumb from '@/components/global/breadcrumb';
import Table from '@/components/tenant/table';
import AddTenant from '@/components/tenant/add-tenant';
import Overset from './basic/actions/over-set';
import EidtTenant from './basic/actions/edit-tenant';
import SetTenantOwenr from './basic/actions/set-tenant-owenr';
import SetTenantQuota from '@/components/tenant/set-tenant-quota';
import Actions from './basic/actions';


@connect(createSelector(
  [
    ({ [`${MODEL}_tenant`]: tenant }: any) => tenant.data,
    ({ [`${MODEL}_tenant`]: tenant }: any) => (tenant.users || {}).list || [],
    ({ [`${MODEL}_quota`]: quota }: any) => quota.oversold,
    props => !!props.loading.effects[`${MODEL}_tenant/get`],
  ],
  (data, users, oversold, loading) => ({ data, users, oversold, loading })
), createSelector(
  [
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/get`, payload: data }),
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/create`, payload: data }),
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/edit`, payload: data }),
    (dispatch: any) => (namespace?: string) => dispatch({ type: `${MODEL}_quota/getoverset`, payload: namespace }),
    (dispatch: any) => (over_set?: string) => dispatch({ type: `${MODEL}_quota/setoversold`, payload: over_set }),
    (dispatch: any) => () => dispatch({ type: `${MODEL}_tenant/getusers`, payload: { group_id: "*" } }),
    (dispatch: any) => (data: any) => dispatch({ type: `${MODEL}_tenant/setadmin`, payload: data }),
  ],
  (getTenants, createTenant, editTenant, getOverset, setOverset, getUsers, setAdmin) => ({ getTenants, createTenant, editTenant, getOverset, setOverset, getUsers, setAdmin })
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
    const { data, routes, oversold, loading, getTenants, createTenant, editTenant, getOverset, setOverset, getUsers, setAdmin } = this.props;
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
            <EidtTenant key="edit" update={() => getTenants({ page, page_size })} />
            <SetTenantOwenr key="owenr" />
            <SetTenantQuota key="quota" />
          </Table>
        </section>
      </Breadcrumb>
    )
  }
}