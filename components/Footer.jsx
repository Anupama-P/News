import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import {Link} from 'react-router';

export default class Footer extends React.Component {

    render() {
        return (
            <footer>
                <ul>
                    <li><Link to=""  activeClassName='active'>Privacy</Link></li>
                    <li><Link to="" activeClassName='active'>Terms</Link></li>
                </ul>
            </footer>
        );
    }
}