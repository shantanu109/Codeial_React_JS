import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { CreatePost,Post } from './index.js';
import CreatePost from './CreatePost';
import Post from './Post'

class PostsList extends Component {
  render() {
    //array
    const { posts } = this.props;
    const {isLoggedIn} = this.props
    return (
      <div className="feed">
        {isLoggedIn && <CreatePost />}
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
          {/* <div className="post-wrapper" key={post._id}>
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
                  <span className="post-time">a minute ago</span>
                </div>
              </div>
              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <div className="post-like">
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                  <span>{post.likes.length}</span>
                </div>

                <div className="post-comments-icon">
                  <img
                    src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                    alt="comments-icon"
                  />
                  <span>{post.comments.length}</span>
                </div>
              </div>
              <div className="post-comment-box">
                <input placeholder="Start typing a comment" />
              </div>

              <div className="post-comments-list">
                <div className="post-comments-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">Bill</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">22</span>
                  </div>

                  <div className="post-comment-content">Random comment</div>
                </div>
              </div>
            </div>
          </div>
        ))} */}
      </div>
    );
  }
}
//This object will contain all the props we have passed to the PostsList component
//Types of props that this PostList component will have
//It will throw an error if we pass an object instead of an array

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
