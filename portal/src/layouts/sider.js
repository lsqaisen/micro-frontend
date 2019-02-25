import { connect } from 'dva';
import withRouter from 'umi/withRouter';
import Sider from '@/components/layouts/sider'

export default withRouter(connect(state => ({
  menus: Object.values(state.mife_menus || {}),
}))(class extends React.PureComponent {
  render() {
    return (
      <Sider />
    )
  }
}))
