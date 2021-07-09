import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  

  handleOnClick = () => {
      //dispatch an action
      const {user} = this.props.auth;
      this.props.dispatch(createPost(this.state.content,user._id))
      this.setState({
        content:''
      })

      
  }

  handleChange = (e) => {
    
      this.setState({
          content: e.target.value
      })
  }

  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <div>
          <button id="add-post-btn" onClick={this.handleOnClick} style={{backgroundColor:'#2e81f4'}}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
    return {
      auth,
    };
  }
export default connect(mapStateToProps)(CreatePost);
