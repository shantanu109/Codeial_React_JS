import { ADD_POST, UPDATE_POSTS } from './actionTypes';
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

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content,userId) {
  return (dispatch) => {
    const url = APIURLS.createPost();

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({content,id: userId}),
    })
    .then(response => response.json())
    .then(data => {
        console.log('DATA',data);

        if (data.success){
            dispatch(addPost(data.data.post));

        }
    })

  };
}
