import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Dropdown from 'react-dropdown';

import { Link } from 'react-router';
import Masonry from 'react-masonry-component';

export default class ListAllSources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.data,
            multiple: false,
            options:['', 'en','de'],
            countries_options:['', 'au', 'de', 'gb', 'in', 'it', 'us'],
            category_options :[ '', 'business', 'entertainment', 'gaming', 'general', 'music', 'science-and-nature', 'sport', 'technology'],
            country:'',
            language:'',
            category:''
        };
    }

    onSelect = (e) => {
        var language = e.target.value
        this.setState({
            language:language
        })
    }
    onSelectCountry = (e) => {
        var country = e.target.value
        this.setState({
            country:country
        })
    }
    onSelectCategory = (e) => {
        var cat = e.target.value
        this.setState({
            category:cat
        })
    }

    setname = (name) => {
        localStorage.setItem("name", name )
    }

    render() {
        var filteredItems = this.props.data;
        var filterProperties = ["language", "country", "category"];
        filterProperties.map((filterBy) => {
          var filterValue = this.state[filterBy];
          if (filterValue) {
            filteredItems = filteredItems.filter((item) =>
              item[filterBy] === filterValue
            );
          }
        });

        return(
            <div className='List-content'>
                <div className='select-grp'>
                    <label htmlFor="language">Language</label>
                    <select id="language" value={this.state.language} onChange={this.onSelect}>
                      {this.state.options.map((option, i) =>
                        <option key={i} value={option}>{option}</option>
                      )}
                    </select>
                    <label htmlFor="country">Country</label>
                    <select id="country" value={this.state.country} onChange={this.onSelectCountry}>
                      {this.state.countries_options.map((option,i) =>
                        <option key={i} value={option}>{option}</option>
                      )}
                    </select>
                    <label htmlFor="category">Category</label>
                    <select id="category" value={this.state.category} onChange={this.onSelectCategory}>
                      {this.state.category_options.map((option,i) =>
                        <option key={i} value={option}>{option}</option>
                      )}
                    </select>
                </div>
                <div className="container">
                    <Masonry className='list-source row'>
                            {filteredItems.map((source,i) =>
                                <div className='col-md-4 col-sm-12'>
                                    <div key={i} className="eachsource">
                                        <img src={source.urlsToLogos.medium} alt='source' />
                                        <div className="about-source">
                                            <h3>{source.name}</h3>
                                                <p>{source.description}</p>
                                        </div>
                                        <Link to='/headlines' onClick={this.setname.bind(this,source.id)}>
                                            <button className='btn btn-source'>Read More</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                    </Masonry>
                </div>
            </div>
        );
    }
}