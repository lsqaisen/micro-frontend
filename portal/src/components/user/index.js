import React from 'react';
import QueueAnim from 'rc-queue-anim';
import FlipCard from '../card/flipcard';
import Login from './login'
import styles from './index.less';

export default class extends (React.PureComponent || React.Component) {
  state = {
    status: 0,
  }
  componentDidMount() {
    const box = document.getElementById('box'),
      shadow = document.getElementById('shadow'),
      loader = document.getElementById('loader');
    if (box) box.style.animation = "stop 0.8s linear";
    if (shadow) shadow.style.animation = "shadowstop 0.8s linear"
    setTimeout(() => {
      if (loader) loader.remove()
    }, 700)
  }
  render() {
    const { status } = this.state;

    return (
      <div className={styles.loginBox}>
        <QueueAnim
          style={{ width: '100%', height: '100%' }}
          delay={400}
          duration={1200}
          type="scale"
          ease="easeInOutQuart"
          animConfig={[
            { opacity: [1, 0], left: [0, '50%'], top: [0, '50%'], width: ['100%', 0], height: ['100%', 0], borderRadius: [0, '100%'] },
            { opacity: [1, 0], left: [0, '50%'], top: [0, '50%'], width: ['100%', 0], height: ['100%', 0], borderRadius: [0, '100%'] }
          ]}>
          {status === 0 && <div className={styles.login} key="a">
            <FlipCard
              axis='center'
              frontChildren={<Login
                loginData={{
                  domains: [],
                  loading: [`user/login`],
                  onSubmit: this.login,
                }}
                firstLoginData={{
                  loading: [`user/login&user/modifyPassword`],
                  onSubmit: this.firstLogin,
                }}
              />}
              backChildren={<div style={{width: '100%', height: '100%'}}></div>}
            />
          </div>}
        </QueueAnim>
      </div>
    )
  }
}
