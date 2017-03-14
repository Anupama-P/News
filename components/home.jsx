import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';


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

    componentWillMount() {
        document.body.classList.add('login-bg');
    }
    componentWillUnmount() {
        document.body.classList.remove('login-bg');
    }

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired,
        };
    }

    authenticate = (e) => {
        e.preventDefault();
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
            <div className='outerdiv'>
                <div className='overlay'></div>
                <div className='loginpage'>
                    <form id='loginform' className='loginform' onSubmit={this.authenticate}>
                        <div className='form-group'>
                            <label htmlFor="Emailinput" className="control-label">Email</label>
                            <input type="email" name="email" placeholder="Email" id="Emailinput" className="form-control" ref='email' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Passwordinput" className="control-label">Password</label>
                            <input type="password" placeholder="Password" id="Passwordinput" className="form-control" ref='password' required/>
                        </div>
                        <h4><Link to='/forgot-password'>forgot password?</Link></h4>
                        <div className="form-group">
                            <div className="buttonClass">
                                <button type="submit" className="btn btn-default">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

