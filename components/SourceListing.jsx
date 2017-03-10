import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";

export default class SourceListing extends React.Component {

    logout = () => {
        firebase.auth().signOut().then(function() {
          localStorage.setItem("loggedin", false);
          location.reload();
        }).catch(function(error) {
          // An error happened.
        });
    }
    render(){
        return (<div><h1>HELLO YOU ARE LOGGED IN</h1>
                <h3 onClick={this.logout}>Logout</h3></div>
            );
    }
}