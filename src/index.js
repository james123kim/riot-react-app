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
            match
                matchtype
                championitemsummsrunes
                    champion
                    ingamelevel
                    summonerspells
                    runes
                    items
                matchstats
                    kda
                    killparticipation
                    controlwards
                    cs (total and per min)
                    averagerank(exclude outliers)
                teamcomp
                    option to fix matchups/lanes
                wholematchstats
                moredetails       -implement later
            match
            match
            pagenav

*/

class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            region: "NA1",
            ingamename: "",
            submittedOnce:false,
            matchList: [],
            profile: [],
        };

        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRegionChange(regioninput) {
        this.setState({region:regioninput});
    }

    handleNameChange(nameinput) {
        this.setState({ingamename:nameinput});
    }

    handleSubmit(event) {
        event.preventDefault();
        
        fetch("http://localhost:4000/getMatchHistory?ingamename="+this.state.ingamename+"&region="+this.state.region)
            .then(function(response) {
                return response.json();
            })
            .then(data => {//anonymous function here to make the context of 'this' the parent function automatically
                console.log(data);
                this.setState({profile:data.profileData, matchList:data.matchData, submittedOnce:true,});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className= "App">
                <FilterAndSearch handleRegionChange = {this.handleRegionChange} 
                    region = {this.state.region}
                    handleNameChange = {this.handleNameChange}
                    ingamename = {this.state.ingamename}
                    onFormSubmit = {this.handleSubmit}
                    />
                <QueriedInformation
                    submittedOnce = {this.state.submittedOnce}
                    matchList = {this.state.matchList}
                    profileData = {this.state.profile}
                    />
            </div>
            );
    }
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
