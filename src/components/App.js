import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
// import {
//   Navbar,
//   Home,
//   Page404,
//   Login,
//   Settings,
//   UserProfile,
//   Signup,
// } from './index.js';
import Navbar from './Navbar';
import Home from './Home';
import Page404 from './Page404';
import Login from './Login';
import Settings from './Settings';
import UserProfile from './UserProfile';
import Signup from './Signup';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { fetchUserFriends } from '../actions/friends';

//const Settings = () => <div>Setting</div>;

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    //type an action that I want to fetch posts

    this.props.dispatch(fetchPosts());

    //const {user} = this.props.auth
    //this.props.dispatch(fetchFriends(user._id));

    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);

      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      //const users = this.props.auth.user
      this.props.dispatch(fetchUserFriends(user._id));
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    const { isLoggedIn } = this.props.auth;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedIn={isLoggedIn}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedIn={auth.isLoggedIn}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedIn={auth.isLoggedIn}
            />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
