import { Button, message } from 'antd';
import AddBank from 'tenant/charge/AddBank';
import { addRechargeConfig } from 'services/tenant';

export default ({ callback, style, children }) => {
    return (
        <AddBank
            onSubmit={(v) => {
                return new Promise(async (resolve, reject) => {
                    const response = await addRechargeConfig(v);
                    if (!!response.err) {
                        message.error(response.err);
                        reject(response.err);
                    } else {
                        !!callback && await callback();
                        resolve();
                    }
                })
            }}
        >
            {children || <Button type="primary" ghost style={style}>添加银行网点</Button>}
        </AddBank>
    )
}