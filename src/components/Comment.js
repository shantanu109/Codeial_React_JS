import React from 'react';

import { deleteComment, addLike} from '../actions/posts';

function Comment({ comment,userId,postId,commentId,dispatch }) {
  const handleDeleteComment = () => {
    
    dispatch(deleteComment(comment._id,userId))

  }
  //const isPostLikedByUser = post.likes.includes(user._id);

  //const handleCommentLike = comment.likes.includes(userId)

  const handleCommentLike = () => {
   
    dispatch(addLike(commentId, 'Comment', userId,postId));
  };
  

  return (
    <div className="post-comment-item">
      <div className="post-comment-header">

        <span className="post-comment-author">{comment.user.name}</span>
        <span className="post-comment-time">a minute ago</span>
        <span className="post-comment-likes">{comment.likes.length} likes</span>
        
      </div>

      <div className="post-comment-content">{comment.content}</div>
      <button className="post-like no-btn" style={{margin:'10px'}} onClick={handleCommentLike}>
              
          <span>LIKE</span>
               
             
        </button>
      <div className="post-avatar">
        {userId && userId === comment.user._id?
        <button className="post-like no-btn" onClick={handleDeleteComment}>
              
          <img src="https://image.flaticon.com/icons/png/512/1214/1214428.png" alt="like post" />
        </button> : []}
        </div>
    </div>
  );
}


export default Comment;
