import { connect } from 'dva';
import { createSelector } from 'reselect';
import Basic from './Basic';

export default connect(createSelector(
    [
        props => props.metrics.summary.monitor,
        props => props.metrics.nodes.monitor,
    ],
    (data, nodes, ) => ({ data, nodes })
))(({ data, nodes, ...props }) => {
    const { data: monitor } = data;
    const { data: _nodes } = nodes;
    return (
        <Basic
            {...props}
            title='监控节点'
            resource="monitor"
            data={monitor || {}}
            nodes={_nodes.nodes || []}
        />
    )
})