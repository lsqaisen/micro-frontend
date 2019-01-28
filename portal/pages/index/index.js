import { connect } from 'dva';
import styles from './index.css';

export default connect(
  state => ({ index: state.index })
)(function(props) {
  return (
    <div className={styles.normal}>
      <h1>{ props.index.title }</h1>
      <ul>
        test
      </ul>
    </div>
  );
});
