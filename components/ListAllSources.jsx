import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import Dropdown from 'react-dropdown';

import { Link } from 'react-router';

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
            <div>
                <select id="language" value={this.state.language} onChange={this.onSelect}>
                  {this.state.options.map((option, i) =>
                    <option key={i} value={option}>{option}</option>
                  )}
                </select>
                <select id="country" value={this.state.country} onChange={this.onSelectCountry}>
                  {this.state.countries_options.map((option,i) =>
                    <option key={i} value={option}>{option}</option>
                  )}
                </select>
                <select id="category" value={this.state.category} onChange={this.onSelectCategory}>
                  {this.state.category_options.map((option,i) =>
                    <option key={i} value={option}>{option}</option>
                  )}
                </select>
                {filteredItems.map((source,i) =>
                    <div key={i}><Link to='/headlines' onClick={this.setname.bind(this,source.id)}>
                    {source.name}
                    <img src={source.urlsToLogos.small} />
                    {source.language}</Link></div>
                )}
            </div>
        );
    }
}