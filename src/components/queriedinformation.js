import React from 'react';
import Profile from './profile';
import Statistics from './statistics';
import MatchHistory from './matchhistory';

class QueriedInformation extends React.Component {
    render() {
        return (
            <div id = "queried-information">
                <div id = "profile-and-statistics">
                    <Profile 
                        profileData = {this.props.profileData}
                        />
                    <Statistics matchList = {this.props.matchList}/>
                </div>
                <MatchHistory matchList = {this.props.matchList}/>
            </div>
        );
    }
}

export default QueriedInformation;