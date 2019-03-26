import * as React from 'react';
import QueueAnim from 'rc-queue-anim';
import Login from './form/login-form';
import ResetPassword from './form/reset-password-form';
import styles from './style/index.less';

const { PureComponent, Component } = React;

type LoginBoxProps = {
  show: string
}

export default class extends (PureComponent || Component)<LoginBoxProps, any> {
  state = {
    type: '',
    style: {},
    firstLogin: false
  }
  goFirstLogin = () => {
    const { firstLogin } = this.state;
    this.setState({
      style: firstLogin ? { height: '328px', transition: "height .4s" } : { height: '368px', transition: "height .4s" },
      firstLogin: !firstLogin,
    })
  }
  changeResetPassword = () => {
    const { type } = this.state;
    this.setState({
      style: type === "reset" ? { height: '328px', transition: "height .4s" } : { height: '418px', transition: "height .4s" },
      firstLogin: false,
      type: type === "reset" ? "login" : "reset"
    })
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
    const { type, style, firstLogin } = this.state;
    return (
      <div className={styles.loginBox} >
        <QueueAnim
          delay={600}
          duration={1200}
          type="scale"
          ease="easeInOutQuart"
          animConfig={[
            { opacity: [1, 0], padding: ['24px', 0], backgroundColor: ['#fff', '#2D225A'], width: ['300px', 0], height: ['328px', 0], borderRadius: ['24px', '100%'] },
            { opacity: [1, 0], padding: ['24px', 0], backgroundColor: ['#fff', '#2D225A'], width: ['300px', 0], height: ['328px', 0], borderRadius: ['24px', '100%'] }
          ]}>
          <div
            key="a"
            style={{ ...style }}
            className={`${styles.box} ${type === "login" && styles.box_flip_l} ${type === "reset" && styles.box_flip_r}`}
          >
            {type === "" || type === "login" ? <Login
              firstLogin={firstLogin}
              domains={[]}
              onChange={() => { }}
              changeResetPassword={this.changeResetPassword}
              onSubmit={() => { }}
              goFirstLogin={this.goFirstLogin}
            /> :
              <ResetPassword
                changeLogin={this.changeResetPassword}
              />}
          </div>
        </QueueAnim>
      </div >
    )
  }
}