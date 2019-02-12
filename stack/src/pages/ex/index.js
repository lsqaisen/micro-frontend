import { connect } from 'dva';
import styles from './index.css';
console.log(styles)

export default connect(state => ({
  stack: state.stack,
}))(function (props) {
  return (
    <div className={styles.normal}>
      test
    </div>
  );
});
