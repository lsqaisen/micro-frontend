import { connect } from 'dva';
import styles from './index.css';
import styles1 from './index.less';
// import styles2 from './index.sass';
console.log(styles, styles1)

export default connect(state => ({
  node: state.node,
}))(function (props) {
  return (
    <div className={styles.normal}>
      <ul>
        {
          props.node.list.map((value, i) => {
            return (
              <li key={i}>{value}</li>
            );
          })
        }
      </ul>
    </div>
  );
});
