import React from 'react';
import ReactDOM from 'react-dom';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            data:[],
        };
    }

    render() {
        return (
            <h1>Hello World!!!</h1>
        );
    }
}
