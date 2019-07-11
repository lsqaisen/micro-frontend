import { Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Images } from '@/components/dashboard';;

export default connect(createSelector(
    [
        props => props.imagelist.list || [],
        props => !!props.loading.effects[`imagelist/query`],
    ],
    (imagelist, loading) => ({ imagelist, loading })
))(class extends Component {
    constructor(props) {
        super(props);
        [`refresh`]
            .forEach(m => this[m] = this[m].bind(this));
    }

    query() {
        const { dispatch } = this.props;
        dispatch({
            type: 'imagelist/query'
        });
    }

    refresh() {
        this.query();
    }

    componentDidMount() {
        this.query();
    }

    render() {
        const { loading, imagelist } = this.props;
        return (
            <Images data={imagelist} loading={loading} />
        )
    }
})