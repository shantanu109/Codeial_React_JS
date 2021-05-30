//exporting the combineReducers method from here
import posts from './posts';
import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
//import friends from './friends'


export default combineReducers({

    posts,
    auth,
    profile,
    //friends

})