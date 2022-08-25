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
                championsplayed
                other info maybe add here later
            matches
                match
                    matchtype
                    yourchampionitemsummsrunes
                        champion
                        ingamelevel
                        summonerspells
                        runes
                        items
                    yourmatchstats
                        kda
                        killparticipation
                        controlwards
                        cs (total and per min)
                        averagerank(exclude outliers)
                    teampcomp
                        option to fix matchups/lanes
                    wholematchstats
                    moredetails       -implement later
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
