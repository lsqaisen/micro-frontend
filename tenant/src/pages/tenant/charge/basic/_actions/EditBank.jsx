import { message } from 'antd';
import { IconButton } from '_global';
import AddBank from 'tenant/charge/AddBank';
import { modifyRechargeConfig } from 'services/tenant';

export default ({ data, callback, style, children }) => {
    return (
        <AddBank
            data={data}
            onSubmit={(v) => {
                return new Promise(async (resolve, reject) => {
                    const response = await modifyRechargeConfig(v);
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
            {children || <IconButton type="edit" style={style} />}
        </AddBank>
    )
}