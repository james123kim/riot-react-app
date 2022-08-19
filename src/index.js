import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchBar from './components/searchbar.js'
import FilterList from './components/filterlist';
/*
component hierarchy:

app
    filterandsearch
        searchbar         
            regiondropdown
            searchinput
            gobutton
        filterlist
            filter --> maybe do composition/ special types of filters
                championdropdown
                patchdropdown
                datedropdown
                otherdropdowns
            filterdetails (generated when filter is active , last clicked filter)

    queriedinformation
        profile
            icon
            summonername
            rank/elo
        winrates
        gamehistory
        



*/




function App() {
    return (
    <div classname= "App">
        <SearchBar />
        <FilterList />
    </div>
    );
}
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
