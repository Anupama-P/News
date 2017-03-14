import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import Masonry from 'react-masonry-component';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

export default class HeadLines extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            source_name:'',
            data:[]
        }
        this.articles();
    }

    articles() {
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
                <Header />
                <div className="container">
                    <Masonry className='list-source row'>
                            {this.state.data.map((article,i) =>
                                <div className='col-md-4 col-sm-12'>
                                    <div key={i} className="eachsource">
                                        <img src={article.urlToImage} alt='articles' />
                                        <div className="about-source">
                                            <h3>{article.title}</h3>
                                            <p>{article.description}</p>
                                        </div>
                                        <a href={article.url} target="_blank">
                                            <button className='btn btn-source'>Read More</button>
                                        </a>
                                    </div>
                                </div>
                            )}
                    </Masonry>
                </div>
                <Footer /> 
            </div>
        );
    }
}