import { connect } from 'dva';
import { createSelector } from 'reselect';
import Basic from './Basic';

export default connect(createSelector(
    [
        props => props.metrics.summary.log,
        props => props.metrics.nodes.log,
    ],
    (data, nodes, ) => ({ data, nodes })
))(({ data, nodes, ...props }) => {
    const { data: log } = data;
    const { data: _nodes } = nodes;
    return (
        <Basic
            {...props}
            title='日志节点'
            resource="log"
            data={log || {}}
            nodes={_nodes.nodes || []}
        />
    )
})