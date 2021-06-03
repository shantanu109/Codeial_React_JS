import React, { Component } from 'react';
import { PostsList,Chat} from './';

class Home extends Component {
    render() {
        const {posts, isLoggedIn} = this.props;
        
        return (
            <div className="home">
                <PostsList posts={posts}/>
                {isLoggedIn && <Chat />}
            </div>
        );
    }
}

export default Home;