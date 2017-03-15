import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';
import Modal from 'react-modal';


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
            error:'',
            isModalOpen:false
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
                var user = firebase.auth().currentUser;
                firebase.auth().onAuthStateChanged(function(user) { 
                      if (user.emailVerified) {
                        console.log('Email is verified');
                        localStorage.setItem("loggedin", true)
                        ReactThis.setState({error:''})
                        ReactThis.context.router.push('/home')
                      }
                      else {
                        ReactThis.setState({error:''})
                        ReactThis.setState({isModalOpen: true})
                    }
                });
            }
            }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                ReactThis.setState({error:'wrong password'});
            } else {
                ReactThis.setState({error:errorMessage});
            }
              document.getElementById('quickstart-sign-in').disabled = false;
        });
    }

    closeModal = () =>{
        this.setState({isModalOpen: false})
    }

    render() {
        return (
            <div className='outerdiv'>
                <div className='overlay'></div>
                <div className='signup-link'>
                    <Link to='/signup'><button type="submit" className="btn">Sign up</button></Link>
                </div>
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
                        {this.state.error ?<div className='error'>{this.state.error}</div> : "" }
                        <h4><Link to='/forgot-password'>forgot password?</Link></h4>
                        <div className="form-group">
                            <div className="buttonClass">
                                <button type="submit" className="btn btn-default">Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
                <Modal
                  isOpen={this.state.isModalOpen}
                  contentLabel="Modal"
                  onRequestClose={this.closeModal}
                  overlayClassName='signin-modal-overlay'
                  className='signin-modal'
                >
                    <p>Please verify your email address before you sign in</p>
                    <button className='btn btn-modal' onClick={this.closeModal}>OK</button>
                </Modal>
            </div>
        );
    }
}

