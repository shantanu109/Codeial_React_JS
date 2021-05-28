//exporting the combineReducers method from here
import posts from './posts';
import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile'


export default combineReducers({

    posts,
    auth,
    profile

})