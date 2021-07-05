import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startSingup, signup ,clearAuthState} from '../actions/auth';
import { Redirect } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import GoogleLogin from 'react-google-login';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState())
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name } = this.state;

    if (email && password && confirmPassword && name) {
      this.props.dispatch(startSingup());
      this.props.dispatch(signup(email, password, confirmPassword, name));
    }
  };

  responseGoogle = (response)=>{
    console.log(response);
    console.log(response.profileObj);
    
    this.props.dispatch(signup(response.profileObj.email,response.profileObj.googleId,response.profileObj.googleId,response.profileObj.givenName))
  }


  render() {

    const { inProgress, error ,isLoggedIn} = this.props.auth;

    if (isLoggedIn){
      return <Redirect to="/" />
    }
    return (
      <div>
      <form className="login-form">
        <span className="login-signup-header"> Signup</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            placeholder="Name"
            type="text"
            required
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Email"
            type="email"
            required
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Confirm password"
            type="password"
            required
            onChange={(e) =>
              this.handleInputChange('confirmPassword', e.target.value)
            }
          />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            type="password"
            required
            onChange={(e) => this.handleInputChange('password', e.target.value)}
          />
        </div>
        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            Signup
          </button>
        </div>
      </form>
      <div style={{marginLeft:'46vw'}}>
      <GoogleLogin
        clientId="856518495899-eebbk7k67frq3389d2jeevhejt5haa7h.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        
      />
      </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Signup);
