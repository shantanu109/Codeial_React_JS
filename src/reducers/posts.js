import { UPDATE_POSTS,ADD_POST,ADD_COMMENT, UPDATE_POST_LIKE,DELETE_POSTS } from '../actions/actionTypes';

export default function posts(state = [], action) {
  // { posts : [] }

  switch (action.type) {
    case UPDATE_POSTS:
      return action.posts;

    case ADD_POST:
      return [action.post, ...state];
    
    case DELETE_POSTS:
      return action.posts;

    case ADD_COMMENT:
        const newPosts = state.map((post) => {
            if (post._id === action.postId){
                return {
                    ...post,
                    comments: [action.comment, ...post.comments]
                };
            }

            return post
        });

        return newPosts;

    case UPDATE_POST_LIKE:
          const updatedPosts = state.map((post) => {
            if (post._id === action.postId){
                return {
                    ...post,
                    likes: action.likes
                };
            }

            return post
        });

        return updatedPosts;


    default:
      return state;
  }
}
