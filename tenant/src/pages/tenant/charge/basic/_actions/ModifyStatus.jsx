import { Component } from 'react';
import { Modal, Button, message } from 'antd';
import { changeStatus } from 'services/tenant';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false }
    }
    render() {
        const { status, callback, ...props } = this.props;
        const { loading } = this.state;
        return (
            <Button
                {...props}
                loading={loading}
                key="status"
                type={status ? "danger" : "primary"}
                onClick={async () => {
                    if (status) {
                        Modal.confirm({
                            title: `是否关闭计费?`,
                            okText: '是',
                            cancelText: '否',
                            onOk: () => {
                                return new Promise(async (resolve, reject) => {
                                    const response = await changeStatus(!status);
                                    if (!!response.err) {
                                        message.error(response.err);
                                        reject(response.err);
                                    } else {
                                        !!callback && await callback();
                                        resolve();
                                    }
                                })
                            }
                        });
                    } else {
                        this.setState({ loading: true });
                        const response = await changeStatus(!status);
                        if (!!response.err) {
                            message.error(response.err);
                        } else {
                            !!callback && await callback();
                        }
                        this.setState({ loading: false });
                    }
                }}
            >
                {status ? `关闭计费` : `计费未开启，立即开启`}
            </Button>
        )
    }
}