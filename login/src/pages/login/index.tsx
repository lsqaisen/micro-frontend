import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import Login from "@/components";

@connect(createSelector(
  [
    (props: any) => props.user.isLogin,
    (props: any) => ({
      [`user/login`]: !!props.loading.effects['user/login'] || !!props.loader.effects['user/profile'],
      [`user/resetPassword`]: !!props.loading.effects[`user/resetPassword`],
      [`user/login&user/modifyPassword`]: !!props.loading.effects['user/login'] || !!props.loading.effects[`user/modifyPassword`],
    }),
  ],
  (isLogin, loading) => {
    return { isLogin, loading }
  },
))
export default class extends (PureComponent || Component)<any, any> {
  state = {
    domains: []
  }

  login = (data: object) => {
    const { dispatch } = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: `user/login`,
        payload: data,
      })
    })
  }

  getCode = (email) => {
    const { dispatch } = this.props;
    // return newPromise(dispatch, {
    //   type: `user/code`,
    //   payload: email,
    // });
  }

  resetPassword = (data) => {
    const { dispatch } = this.props;
    // return newPromise(dispatch, {
    //   type: `user/resetPassword`,
    //   payload: data,
    // });
  }

  firstLogin = (resetData, loginData) => {
    const { dispatch } = this.props;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     await newPromise(dispatch, {
    //       type: `user/modifyPassword`,
    //       payload: resetData,
    //     })
    //     try {
    //       let data = await this.login(loginData);
    //       resolve(data);
    //     } catch (error) {
    //       reject(`密码修改成功，登录失败：${error}`);
    //     }
    //   } catch (error) {
    //     reject(`密码修改失败：${error}`);
    //   }
    // })
  }

  relation = async () => {
    const { dispatch } = this.props;
    // await newPromise(dispatch, {
    //   type: `user/query`,
    // }, (data) => {
    //   this.setState({
    //     domains: Object.keys(data || {}).map(key => (data || {})[key]).filter(v => !!v)
    //   })
    // })
  }

  toDashboard = (props) => {
    if (props.isLogin) {
      this.props.dispatch(routerRedux.push('/dashboard'));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.toDashboard(nextProps);
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
    const { domains } = this.state;
    const { loading } = this.props;
    return (
      <Login
        loginProps={{
          domains: [],
          loading: loading[`user/login`],
          onSubmit: this.login,
        }}
        changePwdData={{
          loading: loading[`user/resetPassword`],
          getCode: this.getCode,
          onSubmit: this.resetPassword,
        }}
      />
    )
  }
}
