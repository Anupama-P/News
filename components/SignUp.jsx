import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';
import serialize from 'form-serialize';
import Modal from 'react-modal';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error:'',
            isModalOpen: false
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

    signup = (e) => {
        e.preventDefault();
        var form = document.querySelector('#loginform3');
        var obj = serialize(form, { hash: true });
        var ReactThis = this;

        if(obj.password==obj.confirm) {
            firebase.auth().createUserWithEmailAndPassword(obj.email, obj.password).then(function(value){
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function() {
                    ReactThis.setState({error:''})
                    ReactThis.setState({isModalOpen: true})
                }, function(error) {
                  // An error happened.
                  ReactThis.setState({error:error.message});
                });
            }).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              if (errorCode === 'auth/wrong-password') {
                    ReactThis.setState({error:'wrong password'});
                } else {
                    ReactThis.setState({error:errorMessage});
                }
            });
        }
        else {
            ReactThis.setState({error:"Password didn't match"});
        }
    }

    render() {
        return (
            <div className='outerdiv'>
                <div className='overlay'></div>
                <div className='loginpage'>
                    <form id='loginform3' className='loginform' onSubmit={this.signup}>
                        <div className='form-group'>
                            <label htmlFor="Emailinput" className="control-label">Email</label>
                            <input type="email" name="email" placeholder="Email" id="Emailinput" className="form-control" required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Passwordinput" className="control-label">Password</label>
                            <input type="password" placeholder="Password" id="Passwordinput" className="form-control" name='password' required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="Passwordinputagain" className="control-label">Password</label>
                            <input type="password" placeholder="Confirm Password" id="Passwordinputagain" className="form-control" name='confirm' required/>
                        </div>
                        {this.state.error ?<div className='error'>{this.state.error}</div> : "" }
                        <div className="form-group">
                            <div className="buttonClass">
                                <button type="submit" className="btn btn-default">Sign up</button>
                            </div>
                        </div>
                        <h4><Link to='/'>Back to Signin</Link></h4>
                    </form>
                </div>
                <Modal
                  isOpen={this.state.isModalOpen}
                  contentLabel="Modal"
                  onRequestClose={this.closeModal}
                  overlayClassName='signin-modal-overlay'
                  className='signin-modal'
                >
                    <p>Please verify your email address by clicking on the link sent to your email.</p>
                    <Link to='/'><button className='btn btn-modal'>OK</button></Link>
                </Modal>
            </div>
        );
    }
}

