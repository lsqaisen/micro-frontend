import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Modal } from 'antd';
import { Content } from '_global';
import Resource from 'node/resource';
import Table from './Table';
import { createResource, deleteResource } from 'services/node';
import Install from './actions/Install';
import Applay from './actions/Apply';
import ApplyNode from './actions/ApplyNode';
const { TableBox } = Content;

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType === 1,
        props => (props.user.profile.data || {}).current,
        props => props.node.resource,
    ],
    (admin, namespace, resource) => {
        if (namespace === 'default') {
            return ({ admin, namespace: '', resource })
        } else {
            return ({ admin, namespace, resource })
        }
    }
))(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resource: '',
        };
        ['resource']
            .forEach(m => this[m] = this[m].bind(this));
    }
    async resource(cluster, namespace, resource) {
        const { dispatch } = this.props;
        await dispatch({
            type: 'node/getResource',
            payload: { cluster, namespace, resource }
        });
    }
    UNSAFE_componentWillReceiveProps({ namespace, cluster, resource }) {
        const { resource: resourceName } = this.state;
        const resources = ((resource[`${cluster || 'default'}-$all`] || {}).data || {}).resources || [];
        if (!!cluster && this.props.cluster !== cluster) {
            this.resource(cluster, namespace, '');
        } else if (!!resourceName && !resources.some(v => v.name === resourceName)) {
            this.setState({ resource: '' });
        }
    }
    componentDidMount() {
        const { namespace, cluster } = this.props;
        const { resource } = this.state;
        if (!!cluster) {
            this.resource(cluster, namespace, resource);
        }
    }
    render() {
        const { admin, namespace, resource, cluster } = this.props;
        const { resource: resourceName } = this.state;
        const info = (resource[`${cluster || 'default'}-$all`] || {}).data || {};
        let _resource = info.resources || [];
        return (
            <TableBox
                desc={!!resourceName ? (_resource.find(v => v.name === resourceName) || {}).desc || '暂无描述' : '所有资源池中的节点'}
                radio={(
                    <Resource
                        value={resourceName}
                        data={_resource}
                        type={resourceName ? (_resource.find(v => v.name === resourceName) || {}).type : '$all'}
                        onChange={(e) => { this.setState({ resource: e.target.value }) }}
                        onCreate={(v) => {
                            return new Promise(async (resolve, reject) => {
                                const response = await createResource({ ...v, namespace });
                                if (!!response.err) {
                                    reject(response.err);
                                } else {
                                    await this.resource(cluster, namespace, '');
                                    resolve();
                                }
                            })
                        }}
                        onDelete={() => {
                            Modal.confirm({
                                title: `是否删除资源池${resourceName}？`,
                                content: '如果该资源池下存在节点，并且节点已分配给工作空间，那么删除该资源池有可能导致工作空间的应用无法正常运行！',
                                okText: '是',
                                cancelText: '否',
                                onOk: () => {
                                    return new Promise(async (resolve, reject) => {
                                        const response = await deleteResource({ name: resourceName, namespace });
                                        if (!!response.err) {
                                            reject(response.err);
                                        } else {
                                            await this.resource(cluster, namespace, '');
                                            resolve();
                                        }
                                    })
                                }
                            });
                        }}
                    />
                )}
                actions={[admin ? <Install {...{ cluster }} /> : <ApplyNode {...{ cluster, namespace }} />, <Applay />]}
            >
                <Table
                    cluster={cluster}
                    resources={_resource}
                    resource={resourceName}
                    namespace={namespace}
                />
            </TableBox>
        )
    }
})