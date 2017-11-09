import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants';

class Header extends Component {

  render() {
    const userID = localStorage.getItem(GC_USER_ID);
    return (
      <div className="flex pal justify-between nowrap orange">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Hacker News</div>
          <Link to="/" className="ml1 no-underline black">new</Link>
          {userID && 
            <div className="flex">
              <div className="ml1"> | </div>
              <Link to="/create" className="ml1 no-underline black">submit</Link>
            </div>
          }
        </div>
        <div className="flex flex-fixed">
          {userID ? 
          <div className="ml1 pointer black" onClick={() => {
            localStorage.removeItem(GC_USER_ID)
            localStorage.removeItem(GC_AUTH_TOKEN)
            this.props.history.push('/new/1')
          }}>Logout</div>
          :
          <Link to="/login" className="ml1 no-underline black">Login</Link>
        }
        </div>
      </div>
    );
  }
}

export default withRouter(Header);