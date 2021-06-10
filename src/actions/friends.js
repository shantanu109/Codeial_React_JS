import { APIURLS } from '../helpers/urls';
//import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import { FETCH_FRIENDS_SUCCESS,ADD_FRIEND, REMOVE_FRIEND } from './actionTypes';



export function fetchUserFriends(userId) {
  return (dispatch) => {
    const url = APIURLS.userFriends(userId);
    fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //Authorization: `Bearer ${getAuthTokenFromLocalStorage()}`,
      }, 
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('data', data);
      
        dispatch(fetchFriendsSucces(data.data.friends));
        console.log('Friends',data.data.friends)
        return;

        
        
      });
  };
}

export function fetchFriendsSucces(friends) {
  return {
    type: FETCH_FRIENDS_SUCCESS,
    friends,
  };
}

export function addFriend(friends){
  return {
    type: ADD_FRIEND,
    friends
  }
}

export function removeFriend(friends){
    return {
        type: REMOVE_FRIEND,
        friends
    }
}