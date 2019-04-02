import PropTypes from 'prop-types';
import { Content } from '_global';
const { Table } = Content;

const Nodes = ({ type, resources, data, exIndex, actions, children, ...props }) => {
    const columns = [
        {
            title: '节点名称',
            dataIndex: 'name',
            type: 'link',
            render: (t, r, i) => ({
                to: `/node/${t}`,
                name: `${t}<${(r.hostIPS[0] || { address: '--' }).address}>`,
            }),
        }, {
            title: '资源池',
            dataIndex: type === 1 ? 'resources' : 'tenantResources',
            type: 'tag',
            render: (t, r) => (t || []).length <= 0 ? '暂未分配' : (t || []).map(v => ({
                color: 'blue',
                name: (resources.find(r => r.name === v) || {}).tag || v,
            })),
        }, {
            title: '副本数',
            dataIndex: 'PodsCount',
            width: 60,
        }, {
            title: '主机类型',
            dataIndex: 'tenant',
            width: '10%',
            render: (t) => t === '' ? '公共主机' : `私有主机，工作空间${t}`,
        },
    ];
    return (
        <Table
            {...props}
            dataSource={data}
            actions={actions}
            columns={columns.concat(exIndex).concat([{
                title: '状态',
                dataIndex: 'status',
                type: 'status',
                width: '10%',
                render: (t, r, i) => ({
                    status: t,
                    text: t,
                    info: {
                        success: ['ready'],
                        error: ['ready,schedulingdisabled', 'schedulingdisabled']
                    }
                }),
            }])}
        />
    );
}

Nodes.defaultProps = {
    resources: [],
    data: [],
    exIndex: [],
    actions: [],
}

Nodes.propTypes = {
    resources: PropTypes.array,
    data: PropTypes.array,
    exIndex: PropTypes.array,
    actions: PropTypes.array,
}

export default Nodes;