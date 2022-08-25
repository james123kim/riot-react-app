import React from 'react';
import SearchBar from './searchbar.js';
import FilterList from './filterlist.js'

class FilterAndSearch extends React.Component {

    render() {
        return (
            <div id = "filter-and-search">
                <SearchBar handleRegionChange = {this.props.handleRegionChange} 
                    region = {this.props.region}
                    handleNameChange = {this.props.handleNameChange}
                    ingamename = {this.props.ingamename}
                    onFormSubmit = {this.props.onFormSubmit}
                    />
                <FilterList />
            </div>
        );
    }
}

export default FilterAndSearch;