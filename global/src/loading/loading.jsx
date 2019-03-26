import styles from './style/Loading.less';

export default (props) => {
  function loop() {
    let e = [], times = 1;
    while (times < 10) e.push(<div key={times} className={`${styles.sk_cube} ${styles[`sk_cube${times++}`]}`}></div>)
    return e;
  }
  return (
    <div className={styles.sk_cube_grid} {...props}>
      {loop()}
    </div>
  )
}

