import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*
component hierarchy:

app
    filterandsearch
        searchbar
            countrydropdown
            searchform
            gobutton
        filterlist
            filter --> maybe do composition/ special types of filters
                championdropdown
                patchdropdown
                datedropdown
                otherdropdowns
            filterdetails

    queriedinformation
        profile
            icon
            summonername
            rank/elo
        winrates
        gamehistory
        



*/






function App() {
    return <div classname= "App">
        <h1> hi!</h1>
    </div>
}
// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
