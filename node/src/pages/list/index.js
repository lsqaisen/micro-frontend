import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.css';

export default connect(state => ({
  stack: state.node,
}))(function(props) {
  return (
    <div className={styles.normal}>
      <ul>
        {
          props.stack.list.map((value, i) => {
            return (
              <li key={i}>{value}</li>
            );
          })
        }
      </ul>
    </div>
  );
});
