
import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import OverSet from 'tenant/config/OverSet';
import { setOverset } from 'services/tenant';

export default connect(createSelector(
    [
        props => props.tenant.oversets,
    ],
    (oversets) => ({ oversets })
))(class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            init: false,
        };
    }
    async oversets() {
        const { dispatch } = this.props;
        await dispatch({
            type: 'tenant/oversets',
            payload: { namespace: '' }
        })
        this.setState({ init: true })
    }
    componentDidMount() {
        this.oversets();
    }
    render() {
        const { oversets } = this.props;
        const { data = {} } = oversets.default || {};
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
                    <span style={{ float: 'left', marginRight: 16 }}>默认资源优先级</span>
                    {set ? <span style={{ color: '#2B73F8' }}>(已设置)</span> : <span style={{ color: '#f5222d' }}>(尚未设置)</span>}
                </h3>
                {init ? <OverSet
                    set={set}
                    data={data}
                    onSubmit={(v) => {
                        return new Promise(async (resolve, reject) => {
                            const response = await setOverset({ namespace: '', ...v });
                            if (!!response.err) {
                                reject(response.err);
                            } else {
                                await this.oversets();
                                resolve();
                            }
                        })
                    }}
                /> : null}
            </div>
        )
    }
})