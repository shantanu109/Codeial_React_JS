import React from 'react';

import { deleteComment, addLike} from '../actions/posts';

function Comment({ comment,userId,postId,commentId,dispatch,isLoggedIn }) {
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
        <span className="post-comment-time">{comment.createdAt.slice(2,10)}</span>
        <span className="post-comment-likes">{comment.likes.length} likes</span>
        
      </div>
      
      <div className="post-comment-content" style={{marginTop:'15px'}}>{comment.content}</div>
      {isLoggedIn && (<div style={{display:'flex'}}>
      <button className="post-like no-btn" style={{margin:'10px',marginRight:'15px',marginTop:'15px',marginLeft:'-10px',backgroundColor:'transparent',cursor:'pointer'}} onClick={handleCommentLike}>
              
          <span style={{fontSize:'15px',fontWeight:'bolder',textShadow:' 0px 1px 1px rgba(0,0,0,0.15)'}}>Like</span>
               
             
        </button>
      <div className="post-avatar">
        {userId && userId === comment.user._id?
        <button className="post-like no-btn" style={{margin:'10px',marginTop:'15px',marginLeft:'-20px',backgroundColor:'transparent',cursor:'pointer'}} onClick={handleDeleteComment}>
              
              <span style={{fontSize:'15px',fontWeight:'bolder',textShadow:' 0px 1px 1px rgba(0,0,0,0.15)'}}>Delete</span>
        </button> : []}
      </div>
      </div>)}
      
    </div>
  );
}


export default Comment;
