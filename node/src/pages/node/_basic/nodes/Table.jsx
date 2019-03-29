import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import NodeTable from 'node/nodes/';
import Chart from './Chart';
import TableAction from './tableactions/';

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType,
        props => props.node.nodes,
        props => props.node.installs.info.data.filter(v => v.status === 'done').length,
        props => !!props.loading.effects[`node/nodes`]
    ],
    (type, nodes, number, loading) => ({ type, nodes, number, loading }),
))(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            itemsPerPage: 10,
        }
    }
    async nodes(cluster, namespace, resource, page, itemsPerPage) {
        const { dispatch } = this.props;
        const { page: _page, itemsPerPage: _itemsPerPage } = this.state;
        if (page !== _page || itemsPerPage !== _itemsPerPage) this.setState({ page, itemsPerPage });
        await dispatch({
            type: 'node/nodes',
            payload: { cluster, namespace, resource, page, itemsPerPage }
        });
    }
    UNSAFE_componentWillReceiveProps({ namespace, cluster, resource, number, loading }) {
        const { page, itemsPerPage } = this.state;
        if (!loading) {
            if ((!!cluster && this.props.cluster !== cluster) || this.props.resource !== resource) {
                this.nodes(cluster, namespace, resource, page, itemsPerPage);
            } else if (number !== this.props.number) {
                this.nodes(cluster, namespace, resource, page, itemsPerPage);
            }
        }
    }
    componentDidMount() {
        const { cluster, namespace, resource } = this.props;
        const { page, itemsPerPage } = this.state;
        if (!!cluster) {
            this.nodes(cluster, namespace, resource, page, itemsPerPage);
        }
    }
    render() {
        const { type, cluster, namespace, resource, resources, nodes, loading } = this.props;
        const { page, itemsPerPage } = this.state;
        const info = nodes[`${resource || '$all'}`] || { data: {}, err: null };
        let exIndex = [{
            title: 'CPU占比',
            dataIndex: 'cpuPercent',
            width: 144,
            render: (t, r) => <Chart
                max={r.cpuRequestsPercent}
                value={t}
                fill={"#FACC14"}
                background="#F7F7F7"
            />
        }, {
            title: 'CPU总量',
            dataIndex: 'cpuTotal',
            width: 80,
            render: (t) => <span>{`${t || 0}核`}</span>
        }, {
            title: '内存占比',
            dataIndex: 'memPercent',
            width: 144,
            render: (t, r) => <Chart
                max={r.memRequestsPercent}
                value={t}
                fill={"#15C3C3"}
                background="#F7F7F7"
            />
        }, {
            title: '内存总量',
            dataIndex: 'memTotal',
            width: 80,
            render: (t) => <span>{`${(t || 0).toFixed(2)}Gi`}</span>
        }];
        const data = {
            type,
            resources,
            loading,
            data: ((info.data || {}).nodes || []).map(v => ({ ...v, key: v.name })),
            pagination: {
                total: ((info.data || {}).listMeta || {}).totalItems || 0,
                current: page,
                pageSize: itemsPerPage,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: (page, itemsPerPage) => this.nodes(cluster, resource, namespace, page, itemsPerPage),
                onShowSizeChange: (page, itemsPerPage) => this.nodes(cluster, resource, namespace, page, itemsPerPage),
                showTotal: total => `共 ${total} 条`,
            },
            exIndex,
            actions: [{
                title: '操作',
                width: 72,
                render: (t, r, i) => (
                    <TableAction {...{
                        name: r.name,
                        namespace,
                        status: r.status,
                        resourcesTotal: resources,
                        resources: type === 1 ? r.resources || [] : r.tenantResources || [],
                        cluster,
                        update: async () => await this.nodes(cluster, namespace, resource, page, itemsPerPage)
                    }} />
                )
            }]
        }
        return (
            <NodeTable
                locale={{
                    emptyText: info.err || '暂无数据',
                }}
                {...data}
            />
        )
    }
})