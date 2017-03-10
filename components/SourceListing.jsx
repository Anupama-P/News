import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import request from 'superagent';

import ListAllSources from './ListAllSources.jsx';

export default class SourceListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data:[],
        };
        this.source();
    }

    source(){
        var ReactThis = this;
        var myurl = 'https://newsapi.org/v1/sources';
          request
          .get(myurl)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            ReactThis.setState({ data: res.body.sources, loaded:true});
          });
    }

    logout = () => {
        firebase.auth().signOut().then(function() {
          localStorage.setItem("loggedin", false);
          location.reload();
        }).catch(function(error) {
          // An error happened.
        });
    }
    render(){
        return (
            <div>
                <h3 onClick={this.logout}>Logout</h3>
                <div>
                    {this.state.loaded ? <ListAllSources data={this.state.data} /> : ''}
                </div>
            </div>
        );
    }
}