import { PureComponent, Component } from 'react';
import { connect } from 'dva';
import { createSelector } from 'reselect';
import { Button } from 'antd';
import Login from "@/components";

@connect(createSelector(
  [
    (props: any) => props.user.isLogin,
    (props: any) => ({
      [`user/login`]: !!props.loading.effects['user/login'],
      [`user/resetPassword`]: !!props.loading.effects[`user/resetPassword`],
      [`user/login&user/modifyPassword`]: !!props.loading.effects['user/login'] || !!props.loading.effects[`user/modifyPassword`],
    }),
  ],
  (isLogin, loading) => {
    return { isLogin, loading }
  },
))
export default class extends (PureComponent || Component) {
  state = {
    domains: []
  }

  login = (data) => {
    const { dispatch } = this.props;
    // return newPromise(dispatch, {
    //   type: `user/login`,
    //   payload: data,
    // }, (data) => {
    //   if (data.code !== 203) {
    //     dispatch({ type: `user/profile` });
    //   }
    // });
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
    this.relation();
    // this.toDashboard(this.props);
  }

  render() {
    const { domains } = this.state;
    const { loading } = this.props;
    return (
      <Login
        loginFormData={{
          loginData: {
            domains,
            loading: loading[`user/login`],
            onSubmit: this.login,
          },
          firstLoginData: {
            loading: loading[`user/login&user/modifyPassword`],
            onSubmit: this.firstLogin,
          },
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
