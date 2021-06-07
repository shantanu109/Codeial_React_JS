import React, { Component } from 'react';
// import { PostsList,Chat, FriendsList} from './index.js';
import PostsList from './PostsList';
import Chat from './Chat';
import FriendsList from './FriendsList';

class Home extends Component {
    render() {
        const {posts, isLoggedIn,friends} = this.props;
        
        return (
            <div className="home">
                <PostsList posts={posts}/>
                {isLoggedIn && <FriendsList friends={friends} />}
                {isLoggedIn && <Chat />}
            </div>
        );
    }
}

export default Home;