import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Breadcrumb from '@/components/global/breadcrumb';
import Table from '@/components/tenant/table';
import AddTenant from './basic/actions/add-tenant';
import Overset from './basic/actions/over-set';
import EidtTenant from './basic/actions/edit-tenant';
import SetTenantOwenr from './basic/actions/set-tenant-owenr';
import SetTenantQuota from './basic/actions/set-tenant-quota';
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

  get = () => {
    const { page, page_size } = this.state;
    this.props.getTenants({ page, page_size })
  };

  componentDidMount() {
    this.get()
  }

  render() {
    const { data, routes, loading } = this.props;
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
              <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
            </div>
            <div className="fr">
              <AddTenant update={this.get} />
            </div>
          </header>
          <Table
            loading={loading}
            data={data}
            actions={<Actions update={this.get} />}
          >
            <Overset key="overset" />
            <EidtTenant key="edit" update={this.get} />
            <SetTenantOwenr key="owenr" update={this.get} />
            <SetTenantQuota key="quota" update={this.get} />
          </Table>
        </section>
      </Breadcrumb>
    )
  }
}