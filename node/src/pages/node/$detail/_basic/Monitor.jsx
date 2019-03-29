import { connect } from 'dva';
import { createSelector } from 'reselect';
import Link from 'umi/link';
import { Row, Col, Button } from 'antd';
import Monitor from 'pages/monitor/_basic/host/';
import { Error } from '_global';

export default connect(createSelector(
    [
        props => props.plugin.data.plugins.some(v => v.spec.id === 'monitor' && v.status === 'active'),
        props => (props.user.profile.data || {}).userType,
        props => (props.user.profile.data || {}).current,
    ],
    (active, type, namespace) => ({ active, type, namespace })
))(({ dispatch, node, active, ...props }) => {
    if (!active) return (
        <div className="center-box">
            <Error.Inactive>
                <div style={{ textAlign: 'center', margin: '24px' }}>
                    <Link to="/plugin">
                        <Button size="large" type="primary">监控未激活，立即前往激活</Button>
                    </Link>
                </div>
            </Error.Inactive>
        </div>
    );
    return (
        <Row>
            <Col span={24}>
                <Monitor node={node} {...props} />
            </Col>
        </Row>
    )
})
