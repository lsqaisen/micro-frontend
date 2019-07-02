import { PureComponent } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Tabs, Empty } from 'antd';
import Loading from '@/components/global/loading';
import Charge from '@/components/charge';
import SetChargeStatus from '@/components/charge/set-charge-status';
import List from './basic/charge';

const TabPane = Tabs.TabPane;

@connect(createSelector(
  [
    ({ [`${MODEL}_charge`]: charge }: any) => charge.init,
    ({ user }: any) => user.admin,
    ({ [`${MODEL}_charge`]: charge }: any) => charge.status,
    (props: any) => !!props.loading.effects[`${MODEL}_quota/getoverset`] || !!props.loading.effects[`${MODEL}_quota/setoverset`],
  ],
  (init, admin, status, loading) => ({ init, admin, status, loading }),
), createSelector(
  [
    (dispatch: any) => () => dispatch({ type: `${MODEL}_charge/status` }),
  ],
  (getStatus) => ({ getStatus })
))
export default class extends PureComponent<any, any> {
  state = {
    activeKey: '1',
    running: undefined,
  }

  titles = ['充值记录', '消费账单', '银行网点', '计费定价', '我的账单'];
  subTitles = ['用户充值记录', '用户消费账单', '配置银行网点', '配置计费定价', '用户账单详情'];

  componentDidMount() {
    this.props.getStatus()
  }

  render() {
    const { init, status, admin } = this.props;
    const { activeKey } = this.state;
    if (!init) {
      return <Loading />
    } else if (!status.running) {
      return (
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Empty
            style={{ float: 'left', position: 'absolute', left: 'calc(50% - 61px)', top: 'calc(50% - 74px)' }}
            description="计费未开启" >
            <SetChargeStatus
              submit={() => { }}
            />
          </Empty>
        </div>
      )
    }
    return (
      <Charge
        name={this.titles[Number(activeKey)]}
        desc={this.subTitles[Number(activeKey)]}
      >
        <div className="box">
          <Tabs defaultActiveKey={activeKey} onChange={(v) => this.setState({ activeKey: v })}>
            {admin ? [
              <TabPane tab="充值记录" key="1">
                <List />
              </TabPane>,
              <TabPane tab="消费账单" key="2">
                {/* <Order admin={admin} /> */}
              </TabPane>,
              <TabPane tab="银行网点" key="3">
                {/* <Bank /> */}
              </TabPane>,
              <TabPane tab="计费定价" key="4">
              </TabPane>
            ] : [
                <TabPane tab="我的账单" key="5">
                  {/* <Order admin={admin} /> */}
                </TabPane>,
                <TabPane tab="充值记录" key="1">
                  {/* <Charge /> */}
                </TabPane>,
              ]}
          </Tabs>
        </div>
      </Charge>
    )
  }
}