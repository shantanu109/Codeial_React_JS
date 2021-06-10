import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../actions/profile';
import { APIURLS } from '../helpers/urls';
import {addFriend,removeFriend} from '../actions/friends';
import { getFormBody } from '../helpers/utils';

class UserProfile extends Component {
  constructor(props){

    super(props);

    this.state = {
      success:null,
      error:null,
      successMessage:null
    }

  }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      // dispatch an action

      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    
    const { match, friends } = this.props;
    const userId = match.params.userId;
  
    const index = friends.map((friend) => friend._id).indexOf(userId);
    

    if (index !== -1) {
      return true;
    }

    return false;
  };

  handleAddFriendClick = async () => {

    const { user } = this.props.auth;
//Check
    const userId = this.props.match.params.userId;
    const url = APIURLS.addFriend(userId);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
      },
      body: getFormBody({
        id: user._id
      }),

    }
    const response = await fetch(url , options);

    const data = await response.json();

    if (data.success){
      this.setState({
        success: true,
        successMessage: 'Added Friend Successfully'
      });

      this.props.dispatch(addFriend(data.data.friends));
    }
    else{
      this.setState({
        success:null,
        error:data.message
      })
    }
  }

  handleRemoveFriendClick = async () => {
    const {match} = this.props;
    const { user } = this.props.auth;
    const url = APIURLS.removeFriend(match.params.userId)

    const extra = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`
      },
      body: getFormBody({
        id: user._id
      }),
    }

    const response = await fetch(url,extra);
    const data = await response.json();
    console.log('AWAIT DATA',data);

    if (data.success){
      this.setState({
        success: true,
        successMessage: 'Removed Friend Successfully'
      });
      this.props.dispatch(removeFriend(data.data.friends));
    } else{
      this.setState({
        success:null,
        error:data.message
      })
    }
  }

  render() {
    const {
      match: { params },
      profile,
    } = this.props;

    const user = profile.user;

    if (profile.inProgress) {
      return <h1>Loading!!</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend();

    const {success,error,successMessage} = this.state;

    console.log('this.props', params);
    const userId = this.props.match.params.userId

    return (

      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button className="button save-btn" onClick={this.handleAddFriendClick}>Add Friend</button>
          ) : (
            <button className="button save-btn" onClick={this.handleRemoveFriendClick} >Remove Friend</button>
          )}

                    
          {success && <div className="alert success-dialog">{successMessage}</div>}
          {success && <div className="alert error-dialog">{error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends,auth }) {
  return {
    profile,
    friends,
    auth
  };
}

export default connect(mapStateToProps)(UserProfile);
