import { connect } from 'dva';
import styles from './index.css';

export default connect(state => ({
  stack: state.stack,
}))(function(props) {
  return (
    <div className={styles.normal}>
      <ul>
        {
          props.stack.data.map((value, i) => {
            return (
              <li key={i}>{value}</li>
            );
          })
        }
      </ul>
    </div>
  );
});
