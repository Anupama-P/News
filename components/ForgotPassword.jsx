import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';
import serialize from 'form-serialize';

export default class ForgotPassword extends React.Component {

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

    verify(e) {
        e.preventDefault();
        var auth = firebase.auth();
        var form = document.querySelector('#loginform2');
        var obj = serialize(form, { hash: true });
        var ReactThis = this;
        auth.sendPasswordResetEmail(obj.email).then(function(res) {
            ReactThis.context.router.push('/success')
        }, function(error) {
          alert(error.message)
        });
    }

    render() {
        return (
            <div className='outerdiv'>
                <div className='overlay'></div>
                <div className='loginpage'>
                    <form id='loginform2' className='loginform' onSubmit={this.verify.bind(this)}>
                        <h4>Forgot Password ?</h4>
                        <p>We will send password reset link to the email address below.</p>
                        <div></div>
                        <div className='form-group'>
                            <label htmlFor="Emailinput" className="control-label">Email</label>
                            <input type="email" name="email" placeholder="Email" id="Emailinput" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <div className="buttonClass">
                                <button type="submit" className="btn btn-default">Send</button>
                            </div>
                        </div>
                        <Link to='/'>Back to sign in</Link>
                    </form>
                </div>
            </div>
        );
    }
}