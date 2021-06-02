import { FETCH_SEARCH_RESULTS_SUCCESS } from './actionTypes';
import {APIURLS} from '../helpers/urls';

export function searchUsers(searchText) {
  return (dispatch) => {
    const url = APIURLS.userSearch(searchText);
    console.log(searchText)
    console.log(typeof(searchText))

    fetch(url, {
      
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
      },
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('SEARCH Data',data);

        if (data.success){

            dispatch(searchResultsSuccess(data.data.users))

        }
        else{
            dispatch(searchResultsSuccess([]))
        }
        
      });
  };
}

export function searchResultsSuccess(users) {
  return {
    type: FETCH_SEARCH_RESULTS_SUCCESS,
    users,
  };
}
