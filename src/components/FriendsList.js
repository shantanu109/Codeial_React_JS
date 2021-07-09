import React from 'react';
// import { FriendsListItem } from './index.js';
import FriendsListItem from './FriendsListItem';

const FriendsList = (props) => {
  return (
    <div className="friends-list">
      <div className="header">Friends</div>

      {props.friends && props.friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

     <div className="sidebar">
      {props.friends &&
        props.friends.map((friend) => (
          <FriendsListItem name={friend.name} id={friend._id} key={friend._id} />
          
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
