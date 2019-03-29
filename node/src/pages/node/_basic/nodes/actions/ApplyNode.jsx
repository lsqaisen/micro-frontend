import { connect } from 'dva';
import { Button } from 'antd';
import ApplyNode from 'node/nodes/ApplyNode';
import { apply, getResource } from 'services/node';

export default connect()(({ namespace, cluster, dispatch }) => {
    return (
        <ApplyNode
            reqResourceSearch={(params) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = await getResource({ cluster });
                        if (response.err) {
                            reject(response.err)
                        } else {
                            resolve({
                                data: ((response.data || {}).resources || []).map(v => ({
                                    key: v.name,
                                    label: `${v.name}(${v.tag})`
                                })),
                                params: null,
                            })
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }}
            desResourceSearch={(params) => {
                return new Promise(async (resolve, reject) => {
                    try {
                        let response = await getResource({ namespace, cluster });
                        if (response.err) {
                            reject(response.err)
                        } else {
                            resolve({
                                data: ((response.data || {}).resources || []).map(v => ({
                                    key: v.name,
                                    label: `${v.name}(${v.tag})`
                                })),
                                params: null,
                            })
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }}
            onSubmit={(v) => {
                return new Promise(async (resolve, reject) => {
                    const response = await apply({ namespace, ...v });
                    if (!!response.err) {
                        reject(response.err);
                    } else {
                        await dispatch({
                            type: 'node/getApply',
                            payload: { namespace }
                        })
                        resolve();
                    }
                })
            }}
        >
            <Button type="primary" ghost style={{ marginRight: 16 }}>申请节点</Button>
        </ApplyNode>
    )
})