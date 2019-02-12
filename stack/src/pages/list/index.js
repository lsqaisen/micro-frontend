import Link from 'umi/link';
import { connect } from 'dva';
import styles from './index.css';
import styles1 from './index.less';
import styles2 from './index.scss';
console.log(styles, styles1, styles2)

export default connect(state => ({
  stack: state.stack,
}))(function (props) {
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
