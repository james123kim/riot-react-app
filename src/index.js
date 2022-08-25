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

class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            region: "NA1",
            ingamename: "",
            riottoken: ""
        };

        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleRegionChange(regioninput) {
        this.setState({region:regioninput});
        console.log(this.state.region);
    }

    handleNameChange(nameinput) {
        this.setState({ingamename:nameinput});
        console.log(this.state.ingamename);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("hi");

        let url = 'https://'+this.state.region+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+this.state.ingamename;
        console.log(url);
        let data = {
            method:'GET',
            mode: 'no-cors',
            headers: {
                "X-Riot-Token": "XXXXX"
            },
        };
        fetch(url, data) 
            .then(function(response) {   
                return response.json();
            })
            .then(function(data) {
                console.log(data);
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
                <QueriedInformation />
            </div>
            );
    }
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
