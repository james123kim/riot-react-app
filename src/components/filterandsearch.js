import React from 'react';
import SearchBar from './searchbar.js';
import FilterList from './filterlist.js'

class FilterAndSearch extends React.Component {
    render() {
        return (
            <div id = "filter-and-search">
                <SearchBar />
                <FilterList />
            </div>
        );
    }
}

export default FilterAndSearch;