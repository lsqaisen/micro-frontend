import { Component, PureComponent } from 'react';
import styles from './style/logo.less';

class Logo extends (Component || PureComponent)<any, any> {
  render() {
    return (
      <div className={styles.logoBox}>
        <a className={styles.logo} href="#" onClick={(e) => e.preventDefault()}>
          <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="logo" />
          <img src="https://gw.alipayobjects.com/zos/rmsportal/tNoOLUAkyuGLXoZvaibF.svg" alt="Ant Design Pro" />
        </a>
      </div>
    )
  }
}

export default Logo;