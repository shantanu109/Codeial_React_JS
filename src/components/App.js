
import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/posts';
import { PostsList , Navbar} from './';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

//Dummy Component
const Login = () => (
  <div>Login</div>
);

const SignUp = () => (
  <div>SignUp</div>
);

const Home = () => (
  <div>Home</div>
);


class App extends React.Component {

  componentDidMount() {
    //type an action that I want to fetch posts

    this.props.dispatch(fetchPosts())
    
  }
  
  render() {
    const {posts} = this.props;
    return (
      <Router>
        <div>
        <Navbar />
        {/*<PostsList posts={posts} />*/}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={SignUp}/>
        </div>
      </Router>
      
    );
  }
}

function mapStateToProps (state){
  return{
    posts: state.posts
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(App);
