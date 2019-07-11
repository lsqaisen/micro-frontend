import { connect } from 'dva';
import { createSelector } from 'reselect';
import Basic from './Basic';

export default connect(createSelector(
    [
        props => props.metrics.summary.balance,
        props => props.metrics.nodes.balance,
    ],
    (data, nodes, ) => ({ data, nodes })
))(({ data, nodes, ...props }) => {
    const { data: balance } = data;
    const { data: _nodes } = nodes;
    return (
        <Basic
            {...props}
            title='负载均衡节点'
            resource="balance"
            data={balance || {}}
            nodes={_nodes.nodes || []}
        />
    )
})