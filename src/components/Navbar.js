import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import { logoutUser } from '../actions/auth';

import { searchUsers } from '../actions/search';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  handleSearch = (e) => {
    const searchText = e.target.value;

    this.props.dispatch(searchUsers(searchText));
  };

  
  render() {
    const { auth, results } = this.props;

    return (
      
      <nav className="header">
        <div className="header__left" style={{display:'flex',justifyContent:'space-evenly'}}>
          <Link to="/">
            <img
            // http://ninjasfiles.s3.amazonaws.com/0000000000003454.png
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo_%282019%29.svg.png"
              alt="logo"
              style={{height:'45px'}}

            />
          </Link>
        
        <div className="header__input">
          {/* <img
            className="search-icon"
            src="https://image.flaticon.com/icons/svg/483/483356.svg"
            alt="search-icon"
          /> */}
          <SearchIcon/>
          <input placeholder="Search" onChange={this.handleSearch} style={{border:'none',backgroundColor:'transparent',outlineWidth:'0',width:'500px'}}/>
          {results.length > 0 && (
            <div className="search-results">
              <ul>
                {results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/user/${user._id}`}>
                    <img
                      src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                      alt="user-dp"
                    />
                    <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>
        {/* <div className="header__middle">
          <div className="header__option header__option--active">
            <HomeIcon fontSize="large"/>
          </div>
          <div className="header__option">
            <FlagIcon fontSize="large"/>
          </div> */}
          {/* <div className="header__option">
            <SubscriptionsOutlinedIcon fontSize="large"/>
          </div>
          <div className="header__option">
            <StorefrontOutlinedIcon fontSize="large"/>
          </div>
          <div className="header__option">
            <SupervisedUserCircleIcon fontSize="large"/>
          </div> */}
        {/* </div> */}
        <div className="header__right">
        <div className="header__info">
          {auth.isLoggedIn && (
            <div className="user">
              <Link to="/settings">
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-dp"
                  id="user-dp"
                  style={{marginLeft:'0px'}}
                />
              </Link>
              <span style={{color:'gray',marginLeft:'10px',fontWeight:'bolder'}}>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links" >
            <ul>
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/login" style={{color:'gray',marginLeft:'10px',fontWeight:'bolder'}}>Login</Link>
                </li>
              )}
              {auth.isLoggedIn && <li onClick={this.logOut} style={{color:'gray',marginLeft:'0px',fontWeight:'bolder'}}>Logout</li>}
              {!auth.isLoggedIn && (
                <li>
                  <Link to="/signup" style={{color:'gray',marginLeft:'10px',fontWeight:'bolder'}} >Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        </div>
      </nav>
      
    );
  }
}

//We are connecting because we want the auth state over here in the NavBar to show the login links/signup links and everything
//We don't want to shaw Login and Sign Up links if the user is already logged in

function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
