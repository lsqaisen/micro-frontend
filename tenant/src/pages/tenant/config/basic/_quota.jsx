
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Modal, message } from 'antd';
import Quota from 'tenant/config/Quota';
import { setDefault, resetDefault } from 'services/tenant';

export default connect(createSelector(
    [
        props => props.tenant.quota,
    ],
    (quota) => ({ quota })
))(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: false,
        };
    }
    async quota() {
        const { dispatch } = this.props;
        await dispatch({
            type: 'tenant/defaultQuota'
        })
        this.setState({ init: true });
    }
    componentDidMount() {
        this.quota();
    }
    render() {
        const { quota: { data = {} } } = this.props;
        const set = Object.keys(data || {}).every(key => !!data[key]);
        const { init } = this.state;
        return (
            <div>
                <h3 style={{
                    paddingLeft: 8,
                    padding: '4px 8px',
                    marginBottom: 16,
                    height: '30px',
                    lineHeight: '22px',
                    borderLeft: '3px solid #2B73F8'
                }}>
                    <span style={{ float: 'left', marginRight: 16 }}>资源默认配额</span>
                    {set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span>}
                </h3>
                {init ? <Quota
                    set={set}
                    data={data}
                    onSubmit={(v) => {
                        return new Promise(async (resolve, reject) => {
                            const response = await setDefault(v);
                            if (!!response.err) {
                                reject(response.err);
                            } else {
                                await this.quota();
                                resolve();
                            }
                        })
                    }}
                    onReset={() => {
                        Modal.confirm({
                            title: `是否取消资源限制？`,
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await resetDefault();
                                    if (!!response.err) {
                                        message.error(`操作失败：${response.err}`);
                                        reject(response.err);
                                    } else {
                                        message.success(`操作成功！`);
                                        await this.quota();
                                        resolve();
                                    }
                                })
                            }
                        });
                    }}
                /> : null}
            </div>
        )
    }
})