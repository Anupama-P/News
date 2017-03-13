import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyB4KQ7EgWVmHXK3N_NavI_acsxqOaFM4hQ",
  authDomain: "news-d1750.firebaseapp.com",
  databaseURL: "https://news-d1750.firebaseio.com",
  storageBucket: "news-d1750.appspot.com",
};
firebase.initializeApp(config);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data:[],
        };
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    authenticate = () => {
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var ReactThis = this;

        firebase.auth().signInWithEmailAndPassword(email, password).then(function(value) {
            localStorage.setItem("loggedin", false)
            if(value.refreshToken) {
                localStorage.setItem("loggedin", true)
            }
            if(localStorage.getItem("loggedin")=='true') {
                ReactThis.context.router.push('/home')
            }
            }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
              document.getElementById('quickstart-sign-in').disabled = false;
        });
    }

    render() {
        return (
            <div className='loginpage'>
                <form id='loginform' className='loginform'>
                    <div className='form-group'>
                        <label htmlFor="Emailinput" className="col-sm-2 control-label">Email</label>
                        <div className="col-sm-12">
                            <input type="email" name="email" placeholder="Email" id="Emailinput" className="form-control" ref='email' />
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="Passwordinput" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-12">
                            <input type="password" placeholder="Password" id="Passwordinput" className="form-control" ref='password' />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="buttonClass">
                            <button type="submit" className="btn btn-default" onClick={this.authenticate}>Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

