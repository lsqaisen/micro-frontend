import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Login from '@/components';
import { LoginRequest, ModifyPasswordRequest, ResetPasswordRequest } from '@/services/user';

@connect(createSelector(
  [
    (props: any) => props.user.domain,
    (props: any) => {
      return ({
        [`user/login`]: !!props.loading.effects['user/login'] || !!props.loading.effects['user/modify'],
        [`user/reset`]: !!props.loading.effects[`user/reset`],
        [`user/send`]: !!props.loading.effects[`user/send`],
      })
    }
  ],
  (domains, loading) => ({ domains, loading }),
))
export default class extends (PureComponent || Component)<any, any> {
  domains = () => {
    return this.props.dispatch({ type: `user/getDomain` })
  }

  login = (data: LoginRequest) => {
    return this.props.dispatch({
      type: `user/login`,
      payload: data,
    })
  }

  modify = (data: ModifyPasswordRequest) => {
    return this.props.dispatch({
      type: `user/modify`,
      payload: data,
    })
  }
  reset = (data: ResetPasswordRequest) => {
    return this.props.dispatch({
      type: `user/reset`,
      payload: data,
    })
  }
  send = (email: string = "") => {
    return this.props.dispatch({
      type: `user/send`,
      payload: email!,
    })
  }
  componentDidMount() {
    this.domains()
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
    const { domains, loading } = this.props;
    return (
      <Login
        domains={domains}
        loginLoading={loading[`user/login`]!}
        onLogin={this.login}
        modifyPassword={this.modify}
        resetLoading={loading[`user/login`]!}
        sending={loading[`user/send`]!}
        sendCode={this.send}
        resetPassword={this.reset}
      />
    )
  }
}