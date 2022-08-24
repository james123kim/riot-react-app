import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterAndSearch from './components/filterandsearch';
import QueriedInformation from './components/queriedinformation';
/*
component hierarchy:

app
    filterandsearch
        searchbar         
            regiondropdown
            searchinput
            gobutton
        filterlist
            filters --> maybe do composition/ special types of filters
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
        statistics
        matchhistory
            sidebar
                championinfo
                otherinfomaybe add here later
            matches
                match
                match
                match
                pagenav
        



*/




function App() {
    return (
    <div className= "App">
        <FilterAndSearch />
        <QueriedInformation />
    </div>
    );
}
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
