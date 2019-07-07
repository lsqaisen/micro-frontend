import router from 'umi/router';
import { connect } from 'dva';
import { createSelector } from 'reselect';
export default connect(createSelector(
    [
        props => (props.user.profile.data || {}).userType === 1
    ],
    (admin) => ({ url: `/registry/${admin ? `projects` : 'repositories'}` })
))(({ url }) => {
    router.push(url)
    return null;
})