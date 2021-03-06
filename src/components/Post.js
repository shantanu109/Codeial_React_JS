import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Comment } from './index.js';
import { addLike, createComment, deletePost } from '../actions/posts';
import Comment from './Comment';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
    };
  }
  handleAddComment = (e) => {
    const { comment } = this.state;
    const { post } = this.props;
    const { user } = this.props.auth;

    if (e.key === 'Enter') {
      this.props.dispatch(createComment(comment, post._id, user._id));

      // clear comment
      this.setState({
        comment: '',
      });
    }
  };

  handleOnCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  handlePostLike = () => {
    const { post } = this.props;
    const { user } = this.props.auth;

    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };

  handleDeletePost = () => {
    const { post } = this.props;
    const { user } = this.props.auth;

    this.props.dispatch(deletePost(post._id, user._id));
  };

  render() {
    const { post } = this.props;
    const { comment } = this.state;
    const { user } = this.props.auth;
    const { dispatch } = this.props;
    const { isLoggedIn } = this.props.auth;

    const isPostLikedByUser = post.likes.includes(user._id);

    return (
      <div className="post" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">{post.createdAt.slice(2, 10)}</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img
                  src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                  alt="like post"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                  alt="unlike post"
                />
              )}
              <span>{post.likes.length}</span>
            </button>

            <div className="post-comments-icon no-btn">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
            {user._id && user._id == post.user._id ? (
              <button
                className="post-delete-icon no-btn"
                onClick={this.handleDeletePost}
              >
                <img
                  src="https://image.flaticon.com/icons/png/512/1214/1214428.png"
                  alt="like post"
                />
              </button>
            ) : (
              []
            )}
          </div>
          <div className="post-comment-box">
            {isLoggedIn && (
              <input
                placeholder="Write a comment..."
                onChange={this.handleOnCommentChange}
                onKeyPress={this.handleAddComment}
                value={comment}
              />
            )}
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => (
              <Comment
                comment={comment}
                userId={user._id}
                key={comment._id}
                postId={post._id}
                commentId={comment._id}
                dispatch={dispatch}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

function mapStateToProps({ auth, post }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Post);
