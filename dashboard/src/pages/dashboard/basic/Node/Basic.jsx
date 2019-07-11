import { Component } from 'react';
import { Node } from '@/components/dashboard';;

export default class extends Component {
    constructor(props) {
        super(props);
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    query(type, namespace, resource) {
        const { dispatch } = this.props;
        dispatch({
            type: 'metrics/summary',
            payload: { type, namespace, resource }
        })
        dispatch({
            type: 'metrics/nodes',
            payload: { namespace, resource: resource === 'scheduling' ? 'master' : resource }
        })
        if (resource === 'scheduling') {
            dispatch({ type: 'metrics/vip' })
            dispatch({ type: 'metrics/servicestatistics' })
        }
    }

    refresh() {
        const { type, namespace, resource } = this.props;
        this.query(type, namespace, resource);
    }

    UNSAFE_componentWillReceiveProps({ type, namespace, resource }) {
        const { type: _type, namespace: _namespace, resource: _resource, } = this.props;
        if (_type !== type || namespace !== _namespace || resource !== _resource) {
            this.query(type, namespace, resource)
        }
    }

    componentDidMount() {
        const { type, namespace, resource } = this.props;
        this.query(type, namespace, resource);
    }

    render() {
        const { type, namespace, resource, data, ...props } = this.props;
        return (
            <Node
                onRefresh={this.refresh}
                data={
                    [{
                        title: 'CPU使用量占比',
                        ratio: (data.cpu || 0) / (data.total_cpu || -1) * 100,
                        used: Number(data.cpu || 0).toFixed(2),
                        total: Number(data.total_cpu || 0).toFixed(2),
                        background: '#f2c306',
                        fill: '#ffe892',
                        unit: '(核)'
                    }, {
                        title: '内存使用量占比',
                        ratio: (data.mem || 0) / (data.total_mem || -1) * 100,
                        used: Number(data.mem || 0).flowCeil(2),
                        total: Number(data.total_mem || 0).flowCeil(2),
                        background: '#15c3c3',
                        fill: '#3fe0df',
                        unit: ''
                    }, {
                        title: '磁盘使用量占比',
                        ratio: (data.filesystem || 0) / (data.total_filesystem || -1) * 100,
                        used: Number(data.filesystem || 0).flowCeil(2),
                        total: Number(data.total_filesystem || 0).flowCeil(2),
                        background: '#8644e0',
                        fill: '#a066fd',
                        unit: ''
                    }]
                }
                {...props}
            />
        )
    }
}