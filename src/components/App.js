
import React from 'react';
import {connect} from 'react-redux';
import {fetchPosts} from '../actions/posts';
import { Navbar, Home, Page404, Login} from './';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Link, Route,Switch } from 'react-router-dom';



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
      <Switch>
        <Route exact={true} path="/" render={(props) => {
          return <Home {...props} posts={posts}/>
        }}/>
        <Route path="/login" component={Login} />
        {/*<Route path="/signup" component={SignUp}/>*/}
        <Route component={Page404}/>
      </Switch>

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
