import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

export default class HeadLines extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            source_name:'',
            data:[]
        }
        this.articles();
    }

    articles(){
        var ReactThis = this;
        var source = localStorage.getItem("name");
        var apiKey = '41469ea1681d4bdd95fee5c4af3abaa5';
        var myurl = 'https://newsapi.org/v1/articles?source='+source+'&sortBy=&apiKey='+apiKey;
          request
          .get(myurl)
          .set('Accept', 'application/json')
          .end(function(err, res) {
            ReactThis.setState({ data: res.body.articles, loaded:true});
          });
    }

    render() {
        return (
            <div>
                {this.state.data.map((article,i) => 
                    <div key={i}><a href={article.url}><b>{article.title}</b>
                    {article.description}</a></div>
                )}
            </div>
            );
    }
}