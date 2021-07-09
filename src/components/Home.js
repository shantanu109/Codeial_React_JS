import React, { Component } from 'react';
// import { PostsList,Chat, FriendsList} from './index.js';
import PostsList from './PostsList';
import Chat from './Chat';
import FriendsList from './FriendsList';
import Widgets from './Widgets';
import Widgets1 from './Widgets1'

class Home extends Component {
    render() {
        const {posts, isLoggedIn,friends} = this.props;
        
        
        return (
            <div className="app_body">
                {isLoggedIn && <FriendsList friends={friends} />}
                <PostsList posts={posts} isLoggedIn={isLoggedIn}/>
                {isLoggedIn && <Chat />}
                {/* {isLoggedIn? (<Widgets/>) : (<Widgets1/>)} */}
                <Widgets/>
            </div>
        );
    }
}

export default Home;