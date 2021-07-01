import {
  ADD_POST,
  UPDATE_POSTS,
  ADD_COMMENT,
  UPDATE_POST_LIKE,
  DELETE_POSTS
} from './actionTypes';
import { APIURLS } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    //const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
    const url = APIURLS.fetchPosts();

    fetch(url)
      .then((response) => {
        console.log('Response', response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch(updataPosts(data.posts));
      });
  };
}

export function updataPosts(posts) {
  return {
    type: UPDATE_POSTS,
    posts,
  };
}
export function deletedPosts(posts) {
  return {
    type: DELETE_POSTS,
    posts,
  };
}
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content, userId) {
  return (dispatch) => {
    const url = APIURLS.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ content, id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA', data);

        if (data.success) {
          dispatch(addPost(data.data.post));
        }
      });
  };
}

export function deletePost(postId, userId) {
  return (dispatch) => {
    const url = APIURLS.deletePost(postId);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('DATA', data);
        if (data.success) {
          dispatch(deletedPosts(data.posts));
        }
      });
  };
}

export function createComment(content, postId, userId) {
  return (dispatch) => {
    const url = APIURLS.createComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({ content, post_id: postId, id: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('COMMENT', data.data.comment);
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

//This id can be postId or commentId
//This likeType can either be a post or a comment because we are using the same API

export function addLike(id, likeType, userId) {
  return (dispatch) => {
    const url = APIURLS.toggleLike(id, likeType);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      },
      body: getFormBody({
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('LIKE DATA', data);

        if (data.success) {
          dispatch(addLikeToStore(id, userId, data.data.likes));
        }
      });
  };
}

export function addLikeToStore(postId, userId, likes) {
  return {
    type: UPDATE_POST_LIKE,
    postId,
    userId,
    likes,
  };
}
