
import {UPDATE_POSTS} from './actionTypes';

export function fetchPosts(){
    return (dispatch) => {
        //const url = 'http://codeial.com:8000/api/v2/posts?page=1&limit=5';
        const url = 'http://localhost:800/api/v1/posts?page=1&limit=5';
        
        fetch(url).then((response) => {
                console.log('Response',response);
                return response.json();
            }).then((data) => {
                console.log(data);
                dispatch(updataPosts(data.posts));
            });
    }
}

export function updataPosts(posts){
    return {
        type: UPDATE_POSTS,
        posts
    }
}