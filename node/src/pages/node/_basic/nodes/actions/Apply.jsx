import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Apply from 'node/nodes/Apply';
import { nodes, setApply } from 'services/node';

export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType === 1,
        props => (props.user.profile.data || {}).current === 'default' ? '' : (props.user.profile.data || {}).current,
        props => props.node.apply,
        props => !!props.loading.effects[`node/getApply`]
    ],
    (admin, namespace, apply, loading) => ({ admin, namespace, apply, loading })
))(class extends Component {
    timeHandle = null;
    async apply() {
        const { namespace, dispatch } = this.props;
        await dispatch({
            type: 'node/getApply',
            payload: { namespace }
        })
    }
    componentDidMount() {
        const { admin } = this.props;
        this.apply();
        if (admin) this.timeHandle = setInterval(() => {
            if (!this.props.loading) {
                this.apply();
            }
        }, 30000)
    }
    componentWillUnmount() {
        clearInterval(this.timeHandle);
    }
    render() {
        const { admin, apply: { data = {} } } = this.props;
        const { applys = [] } = data;
        return (
            <Apply
                admin={admin}
                applys={applys}
                nodeSearch={nodes}
                setApply={async (v) => {
                    const response = await setApply({ ...v });
                    if (!response.err) {
                        await this.apply();
                    }
                    return response.err;
                }}
                onApply={(v) => {
                    return new Promise(async (resolve, reject) => {
                        const response = await setApply({ ...v });
                        if (!!response.err) {
                            reject(response.err);
                        } else {
                            await this.apply();
                            resolve()
                        }
                    })
                }}
            />
        )
    }
})