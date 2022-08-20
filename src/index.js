import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FilterAndSearch from './components/filterandsearch';
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
        metrics
            winrate
            averagegametime
            averagecs(averagecspermin)
            leave room for more. we'll just do winrate for now
        gamehistory
        



*/

function App() {
    return (
    <div classname= "App">
        <FilterAndSearch />
    </div>
    );
}
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
