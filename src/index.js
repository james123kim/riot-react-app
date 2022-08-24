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
<<<<<<< HEAD
        metrics
            winrate
            averagegametime
            averagecs(averagecspermin)
            leave room for more. we'll just do winrate for now
        gamehistory
=======
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
>>>>>>> 3a63cec9f8f3f0770d54351ce37c2202cea3e9b1
        



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
