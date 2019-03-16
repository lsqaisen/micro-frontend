import { PureComponent, Component } from 'react';
import QueueAnim from 'rc-queue-anim';
import { Card } from 'antd';
import { FlipCard } from 'plugin-global';
import LoginForm from './form/login-form';
import Logo from './logo';
import styles from './style/index.less';

export default class extends (PureComponent || Component)<any, any> {
  state = {
    status: 0,
    flipKey: 'login'
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
    const { status, flipKey } = this.state;
    return (
      <div className={styles.loginBox}>
        <QueueAnim
          style={{ marginTop: '-5%' }}
          delay={400}
          duration={1200}
          type="scale"
          ease="easeInOutQuart"
          animConfig={[
            { opacity: [1, 0], width: ['320px', 0], height: ['320px', 0], borderRadius: ['3px', '100%'] },
            { opacity: [1, 0], width: ['320px', 0], height: ['320px', 0], borderRadius: ['3px', '100%'] }
          ]}>
          {status === 0 && <div className={styles.box} key="a">
            <FlipCard className={styles.login} flipKey={flipKey}>
              <FlipCard.Item key="login">
                {/* <Logo /> */}
                <LoginForm
                  key="login"
                  domains={[]}
                  onChange={() => { }}
                  onSubmit={() => { }}
                  goFirstLogin={() => { }}
                />
              </FlipCard.Item>
              <FlipCard.Item key="first">
                <Card style={{ width: '100%', height: '100%' }} onClick={() => this.setState({ flipKey: 'login' })}>
                  xxxx
                </Card>
              </FlipCard.Item>
              <FlipCard.Item key="modify">modify</FlipCard.Item>
            </FlipCard>
          </div>}
        </QueueAnim>
      </div>
    )
  }
}