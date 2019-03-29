import styles from './style/index.less';
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button, Icon, Modal, message } from 'antd';
import { LeftModal } from '_global';
import { joinResource, removeResource } from 'services/node';

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType,
    ],
    (type) => ({ type })
))(class extends Component {
    async resource(cluster, namespace) {
        const { dispatch } = this.props;
        await dispatch({
            type: 'node/getResource',
            payload: { cluster, namespace, resource: '' }
        });
    }
    render() {
        const { name, namespace, resourcesTotal, resources, cluster, update, children } = this.props;
        return (
            <LeftModal title={`主机${name}资源池管理`} btn={children} >
                <div style={{ padding: 24 }}>
                    {resourcesTotal.map(v => <div key={v.name} className={styles.join}>
                        <div className={styles.join_content}>
                            <p className={styles.join_title}><Icon type="tags-o" />{`${v.tag}(${v.name})`}</p>
                            <p className={styles.join_desc}>{v.desc}</p>
                        </div>
                        <Button
                            type={resources.some(name => v.name === name) ? 'danger' : 'primary'}
                            className={styles.join_btn}
                            onClick={() => {
                                resources.some(name => v.name === name) ?
                                    Modal.confirm({
                                        title: '是否移除该节点？',
                                        content: '将主机从改资源池移除后，那么工作在改主机上的所有应用服务将停止或异常，请谨慎操作！',
                                        okText: '是',
                                        cancelText: '否',
                                        onOk: () => {
                                            return new Promise(async (resolve, reject) => {
                                                const response = await removeResource({ namespace, resource: v.name, name });
                                                if (!!response.err) {
                                                    message.error(response.err);
                                                    reject(response.err);
                                                } else {
                                                    await Promise.all([this.resource(cluster, namespace), update()]);
                                                    resolve();
                                                }
                                            })
                                        }
                                    }) :
                                    Modal.confirm({
                                        title: '是否移加入该资源池？',
                                        okText: '是',
                                        cancelText: '否',
                                        onOk: () => {
                                            return new Promise(async (resolve, reject) => {
                                                const response = await joinResource({ namespace, resource: v.name, names: [name] });
                                                if (!!response.err) {
                                                    message.error(response.err);
                                                    reject(response.err);
                                                } else {
                                                    await Promise.all([this.resource(cluster, namespace), update()]);
                                                    resolve();
                                                }
                                            })
                                        }
                                    })
                            }}>
                            {resources.some(name => v.name === name) ? '移除' : '加入'}
                        </Button>
                    </div>)}
                </div>
            </LeftModal>
        )
    }
})