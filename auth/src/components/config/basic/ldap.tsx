
import { Component } from 'react';
import { Switch, Modal, message } from 'antd';
import Ldap from 'auth/config/ldap';
import { setLdap, setLdapStatus } from 'services/auth';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }
    render() {
        const { data = {}, update } = this.props;
        const { loading } = this.state;
        delete data.email_identity;
        const set = Object.keys(data || {}).every(key => !!data[key]);
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
                    <Switch
                        loading={loading}
                        style={{ float: 'left', marginRight: 16 }}
                        checkedChildren="启用"
                        unCheckedChildren="禁用"
                        checked={data.ldap_enable}
                        onChange={(v) => {
                            Modal.confirm({
                                title: `是否${v ? '开启' : '关闭'}LDAP？`,
                                okText: '是',
                                cancelText: '否',
                                onOk: () => {
                                    return new Promise(async (resolve, reject) => {
                                        this.setState({ loading: true })
                                        const response = await setLdapStatus(v);
                                        if (!!response.err) {
                                            message.error(response.err);
                                            reject(response.err);
                                        } else {
                                            await update();
                                            resolve();
                                        }
                                        this.setState({ loading: false })
                                    })
                                }
                            });
                        }}
                    />
                    <span style={{ float: 'left', marginRight: 16 }}>LDAP设置</span>
                    {data.ldap_enable ? set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span> : null}
                </h3>
                <Ldap
                    data={data}
                    onSubmit={(v) => {
                        return new Promise(async (resolve, reject) => {
                            const response = await setLdap(v);
                            if (!!response.err) {
                                reject(response.err);
                            } else {
                                await update();
                                resolve();
                            }
                        })
                    }}
                />
            </div>
        )
    }
}