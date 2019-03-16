import PropTypes from 'prop-types';
import Animate from 'rc-animate';
import LoginForm from './loginform';
import FirstLoginForm from './firstloginform';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstlogin: false,
      loginInfo: {},
    };
  }

  render() {
    const { loginData, firstLoginData } = this.props;
    const { firstlogin, loginInfo } = this.state;
    return (
      <Animate
        transitionLeave={false}
        transitionName="fade"
      >
        {firstlogin ? (
          <FirstLoginForm
            key="1"
            loginInfo={loginInfo}
            goLogin={() => this.setState({ firstlogin: false })}
            {...firstLoginData}
          />
        ) : <LoginForm
            key="2"
            goFirstLogin={(data) => this.setState({ firstlogin: true, loginInfo: data })}
            {...loginData}
          />}
      </Animate>
    )
  }
}

Login.defaultProps = {
}

Login.propTypes = {
  loginData: PropTypes.shape({
    domains: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    goFirstLogin: PropTypes.func.isRequired,
  }).isRequired,
  firstLoginData: PropTypes.shape({
    loginInfo: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    goLogin: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }).isRequired,
}

export default Login;