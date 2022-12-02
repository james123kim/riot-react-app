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
    constructor(props) {
        super(props);
        this.state = {
            region: "NA1",
            ingamename: "",
            initialSubmit: false,
            lastSubmittedName: "",
            fetching: false,
            //fetched from backend/riotapi
            matchList: [],
            profile: [],
            summoner: [],

            //fetched from online api
            versions: [],
            queueMap: null,
            versionData: {},
            /*
            versionData holds data specific to versions. such as items, runes, summs.
            generate the most recent version initially, then update only if looking for a game not of this version
            {
                12.22.1: {
                    items: map?
                    runes: {}
                    summonerSpells: {}
                }
                12.22.2: {
                    items: {}
                    runes: {}
                    summonerSpells: {}
                }
            }
            */
        };


        this.handleRegionChange = this.handleRegionChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addVersionData = this.addVersionData.bind(this);
        this.convertGameVersion = this.convertGameVersion.bind(this);
    }

    componentDidMount() {
        fetch('http://ddragon.leagueoflegends.com/api/versions.json')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    versions: data,
                });
                console.log('got versions');

            })
            .catch(function (error) {
                console.log(error);
            });

        let queueMap = new Map();
        fetch('https://static.developer.riotgames.com/docs/lol/queues.json')
            .then(function (response) {
                return response.json();
            })
            .then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let str;
                    if (i === 0) str = data[i].map;
                    else str = data[i].description;
                    if (str.length > 6 && str.slice(-6) === ' games') {
                        str = str.slice(0, -6);
                    }
                    queueMap.set(data[i].queueId, str);
                }
                this.setState({ queueMap: queueMap });
                console.log('got queues');
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    handleRegionChange(regioninput) {
        this.setState({ region: regioninput });
    }

    handleNameChange(nameinput) {
        this.setState({ ingamename: nameinput });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ fetching: true });
        fetch("http://localhost:4000/getMatchHistory?ingamename=" + this.state.ingamename + "&region=" + this.state.region)
            .then(function (response) {
                return response.json();
            })
            .then(data => {//anonymous function here to make the context of 'this' the parent function automatically
                console.log(data);
                let matches = data.matchData;

                let newVersionData = {};
                for(let i of matches) {
                    //if the version given is not the MOST CURRENT version, update the maps(items, runes, summoners) to include it
                    if('message' in i) {break;}
                    
                    let version = this.convertGameVersion(i.info.gameVersion);
                    if (!(version in this.state.versionData)) {
                        let x = this.addVersionData(version);
                        newVersionData[version] = x;
                    }
                }

                this.setState((state) => ({
                    profile: data.profileData,
                    matchList: data.matchData,
                    initialSubmit: true,
                    lastSubmittedName: state.ingamename,
                    summoner: data.summonerData,
                    versionData: newVersionData,
                    fetching: false,
                }));
                console.log('updating versiondata');
            })
            .catch((error) => {
                console.log(error);
                this.setState({ fetching: false });
            });
    }
    
    addVersionData(version) {
        let tempObject = {};
        fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/item.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                tempObject['items'] = data;
                tempObject['itemMap'] = {};
                let x = data['data'];
                for(let i in x) {
                    tempObject['itemMap'][i] = x[i].image.full;
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/summoner.json')
            .then(function (response) {
                return response.json();
            })
            .then(function(data) {
                tempObject['summonerSpells'] = data;
                tempObject['summMap'] = {};
                let x = data['data'];
                for(let i in x) {
                    tempObject['summMap'][x[i].key] = x[i].id;
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/runesReforged.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                tempObject['runes'] = data;
                tempObject['runeMap'] = {};
                for(let i = 0; i < data.length; i++) {
                    let slots = data[i].slots
                    for (let j = 0; j < slots.length; j++) {
                        let runes = slots[j].runes;
                        for (let k = 0; k < runes.length; k++) {
                            let rune = runes[k];
                            tempObject['runeMap'][rune.id] = rune.icon;
                        }
                    }
                }
                tempObject['runeMap'][5001] = 'perk-images/StatMods/StatModsHealthScalingIcon.png'; //health
                tempObject['runeMap'][5002] = 'perk-images/StatMods/StatModsArmorIcon.png'; //armor
                tempObject['runeMap'][5003] = 'perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png'; //mr
                tempObject['runeMap'][5005] = 'perk-images/StatMods/StatModsAttackSpeedIcon.png'; //atk speed
                tempObject['runeMap'][5007] = 'perk-images/StatMods/StatModsCDRScalingIcon.png'; //cdr
                tempObject['runeMap'][5008] = 'perk-images/StatMods/StatModsAdaptiveForceIcon.png'; //adaptive
            })
            .catch(function (error) {
                console.log(error);
            });

        /*this.setState(prevState => ({
            versionData: {
                ...prevState.versionData,
                [version]:tempObject
            }
        }));*/

        return tempObject;
    }

    convertGameVersion(num) {
        let versions = this.state.versions;
        for (let j = 0; j < versions.length; j++) {
            let version = versions[j];
            let str1;
            let str2;
            let count = 0;
            for (let i = 0; i < num.length; i++) {
                if (num.charAt(i) === '.') {
                    if (count === 0) count += 1;
                    else {
                        str1 = num.slice(0, i);
                        break;
                    }

                }
            }
            count = 0;
            for (let i = 0; i < version.length; i++) {
                if (version.charAt(i) === '.') {
                    if (count === 0) count += 1;
                    else {
                        str2 = version.slice(0, i);
                        break;
                    }
                }
            }

            if (str1 === str2) {
                return version;
            }
        }
    }

    render() {
        return (
            <div className="App">
                <FilterAndSearch handleRegionChange={this.handleRegionChange}
                    region={this.state.region}
                    handleNameChange={this.handleNameChange}
                    ingamename={this.state.ingamename}
                    onFormSubmit={this.handleSubmit}
                    fetching={this.state.fetching}
                />
                <QueriedInformation
                    initialSubmit={this.state.initialSubmit}
                    submittedOnce={this.state.submittedOnce}
                    matchList={this.state.matchList}
                    profileData={this.state.profile}
                    summonerData={this.state.summoner}
                    onNameClick={this.handleNameChange}
                    convertGameVersion={this.convertGameVersion}
                    versionData={this.state.versionData}
                    queueMap={this.state.queueMap}
                />
            </div>
        );
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
