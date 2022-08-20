import React from 'react';
import SearchBar from './components/searchbar.js'
import FilterList from './components/filterlist';


class FilterAndSearch extends React.Component {
    render() {
        return (
            <div classname="filterandsearch">
                <SearchBar />
                <FilterList />
            </div>
        );
    }
}

export default FilterAndSearch;