import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';

export default class Success extends React.Component {
    componentWillMount() {
        document.body.classList.add('login-bg');
    }
    componentWillUnmount() {
        document.body.classList.remove('login-bg');
    }

    render() {
        return (
            <div className='outerdiv'>
                <div className='overlay'></div>
                <div className='loginpage'>
                    <p>Password reset link is sent to your email. Please use the link and reset your password</p>
                    <Link to='/'>Back to sign in</Link>
                </div>
            </div>
        );
    }
}