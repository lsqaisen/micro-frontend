import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Menu, Icon, Dropdown, Button } from 'antd';
import Loading from '@/components/global/loading';
import Table from '@/components/user/table';

@connect(createSelector(
  [
    (props: any) => props.authuser.init,
    (props: any) => props.authuser.data,
    (props: any) => props.loading.effects[`authuser/get`],
  ],
  (init, data, loading) => ({ init, data, loading })
))
export default class extends PureComponent<any, any> {
  get = () => {
    return this.props.dispatch({ type: 'authuser/get' });
  }
  componentDidMount() {
    this.get()
  }
  render() {
    const { init, data, group_id, loading } = this.props;
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
            <Button style={{ marginLeft: 16 }} type="ghost" loading={loading} onClick={this.get} >刷新</Button>
          </div>
          <div className="fr">
          </div>
        </header>
      </div>
    )
  }
}