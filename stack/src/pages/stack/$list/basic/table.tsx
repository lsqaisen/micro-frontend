import { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { createSelector } from 'reselect';
import Loading from '@/components/global/loading';
import Table from '@/components/app/table';
import AddApp from '@/components/app/add-app';

@connect(createSelector(
  [
    (props: any) => props.app.init,
    (props: any) => props.app.data,
    (_: any, { stackName }: any) => stackName,
    (props: any) => props.loading.effects[`app/get`],
  ],
  (init, data, stackName, loading) => ({ init, data, stackName, loading })
))
export default class extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'app/get' });
  }
  create = (data: any) => {
    return this.props.dispatch({
      type: 'stack/create',
      payload: data,
    })
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { init, data, loading } = this.props;
    if (!init) return <Loading />;
    return (
      <div style={{
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: '8px',
        boxShadow: `0 2px 8px rgba(0, 0, 0, 0.09)`,
      }}>
        <header style={{ overflow: 'hidden', marginBottom: 16 }}>
          <div className="fr">
            <AddApp />
          </div>
        </header>
        <Table
          loading={loading}
          list={data}
          actions={() => <div />}
        />
      </div >
    )
  }
}