import { Modal, message } from 'antd';
import { IconButton } from '_global';
import { deleteRechargeConfig } from 'services/tenant';

export default ({ bankid, name, callback, children, style }) => {
    return <span onClick={() => {
        Modal.confirm({
            title: `是否删除银行网点${name}？`,
            okText: '是',
            cancelText: '否',
            onOk: () => {
                return new Promise(async (resolve, reject) => {
                    const response = await deleteRechargeConfig(bankid);
                    if (!!response.err) {
                        message.error(response.err);
                        reject(response.err);
                    } else {
                        !!callback && callback();
                        message.success('删除成功');
                        resolve();
                    }
                })
            }
        });
    }}>
        {children || <IconButton type="delete" style={{ ...style, color: '#f04134' }} />}
    </span>
}