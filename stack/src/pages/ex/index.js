import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.css';

export default connect(state => ({
  stack: state.stack,
}))(function (props) {
  return (
    <div className={styles.normal}>
      test
    </div>
  );
});
