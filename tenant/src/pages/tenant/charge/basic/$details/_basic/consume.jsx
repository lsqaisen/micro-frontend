import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Details } from '_global';

export default connect(createSelector(
    [
        props => props.charge.details,
        props => !!props.loading.effects[`charge/details`],
    ],
    (details, loading) => ({ details, loading })
))(class extends Component {
    constructor(props) {
        super(props);
    }
    details(type, id) {
        const { dispatch } = this.props;
        dispatch({
            type: 'charge/details',
            payload: { type, id },
        })
    }
    componentDidMount() {
        const { type, id } = this.props;
        this.details(type, id);
    }
    render() {
        const { details, loading } = this.props;
        console.log(details, loading)
        return (
            <Details firstLoading={loading} >
                <Details.Header
                    header
                    key="header"
                    icon={<i className={`iconfont icon-node`} />}
                    name={(
                        <span> xxxx</span>
                    )}
                    tags={[]}
                    desc={<div>xxxx  </div>}
                    operateRender={() => (
                        <div>
                            <Button style={{ marginLeft: '16px' }} type="ghost" >刷新</Button>
                        </div>
                    )} />
                <Details.Pages key="pages" pages defaultActiveKey="monitor">
                    xxxx
                </Details.Pages>
            </Details>
        )
    }
})
