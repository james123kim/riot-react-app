import React from 'react';
import Profile from './profile';
import Statistics from './statistics';
import MatchHistory from './matchhistory';

class QueriedInformation extends React.Component {
    render() {
        if(this.props.initialSubmit === false) {
            return (<div id = "queried-information"></div>);
        }
        let profileD = this.props.profileData;
        if(Object.prototype.toString.call(profileD) !== '[object Array]')
        {
            return (<div id = "queried-information">
                {profileD.message}
            </div>);
        }
        return (
            <div id = "queried-information">
                <div id = "profile-and-statistics">
                    <Profile 
                        profileData = {profileD}
                        />
                    <Statistics summonerData = {this.props.summonerData} matchList = {this.props.matchList}/>
                </div>
                <MatchHistory summonerData = {this.props.summonerData} 
                    matchList = {this.props.matchList}
                    onNameClick = {this.props.onNameClick}
                    convertGameVersion = {this.props.convertGameVersion}
                    versionData= {this.props.versionData}
                    queueMap={this.props.queueMap}
                    />
            </div>
        );
    }
}

export default QueriedInformation;