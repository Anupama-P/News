import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';

export default class Header extends React.Component {
    logout = () => {
        firebase.auth().signOut().then(function() {
          localStorage.setItem("loggedin", false);
          location.reload();
        }).catch(function(error) {
          // An error happened.
        });
    }

    render() {
        return (
            <header>
                <ul className="nav navbar-nav">
                    <li><Link to="/home"  activeClassName='active'>Article Sources</Link></li>
                    <li><Link to="" activeClassName='active'>About</Link></li>
                    <li><Link to='/headlines' activeClassName='active'>Contact</Link></li>
                    <li><Link onClick={this.logout} className='logout' to='#'>Sign out</Link></li>
                </ul>
            </header>
        );
    }
}