import { connect } from 'dva';
import { createSelector } from 'reselect';
import Basic from './Basic';

export default connect(createSelector(
    [
        props => props.metrics.summary.scheduling,
        props => props.metrics.nodes.master,
        props => props.metrics.vip,
        props => props.metrics.servicestatistics
    ],
    (data, nodes, vip, servicestatistics) => ({ data, nodes, vip, servicestatistics })
))(({ data, nodes, vip, servicestatistics, ...props }) => {
    const { data: scheduling } = data;
    const { data: _nodes } = nodes;
    const { data: _vip } = vip;
    const { data: _servicestatistics } = servicestatistics;
    return (
        <Basic
            {...props}
            title='调度节点'
            resource="scheduling"
            data={scheduling || {}}
            nodes={_nodes.nodes || []}
            vip={_vip || {}}
            servicestatistics={_servicestatistics || []}
        />
    )
})