import React, { PureComponent, Component } from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { Form, Card, Button } from 'antd';
import FlipCard from '../flipcard';
import Animate from 'rc-animate';
import LoginForm from './form/login-form';

const _LoginForm = Form.create()(LoginForm)

export type LoginProps = {
  first?: boolean;
  loginInfo: any;
  loginData: any;
  firstLoginData: any;
}

class Login extends (PureComponent || Component)<LoginProps, any>{
  static NameInput = null;
  static EmailInput = null;

  static defaultProps = {
    first: false,
  }

  state = {
    flipKey: '1'
  }

  render() {
    const { first, loginInfo, loginData, firstLoginData } = this.props;
    const { flipKey } = this.state;
    console.log(flipKey)
    return (
      <div style={{ margin: 'auto 320px' }}>
        <Button
          onClick={() => {
            this.setState({
              flipKey: `${Number(flipKey) === 4 ? 1 : Number(flipKey) + 1}`
            })
          }}>xxxxx</Button>
        <FlipCard defaultFlipKey={flipKey} flipKey={flipKey} axis="right">
          <FlipCard.Item key="1">
            <Card style={{ width: '100%', height: '100%', backgroundColor: '#432' }}>
              <_LoginForm />
            </Card>
          </FlipCard.Item>
          <FlipCard.Item key="2">
            <Card style={{ width: '100%', height: '100%', backgroundColor: '#f32' }}>22222</Card>
          </FlipCard.Item>
          <FlipCard.Item key="3">
            <Card style={{ width: '100%', height: '100%', backgroundColor: '#632' }}>33333</Card>
          </FlipCard.Item>
          <FlipCard.Item key="4">
            <Card style={{ width: '100%', height: '100%', backgroundColor: '#932' }}>44444</Card>
          </FlipCard.Item>
        </FlipCard>
      </div>
    )
  }
}

polyfill(Login);

export default Login;