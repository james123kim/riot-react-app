import React from 'react';
import Profile from './profile';
import Statistics from './statistics';
import MatchHistory from './matchhistory';

class QueriedInformation extends React.Component {
    render() {
        return (
            <div id = "queried-information">
                <div id = "profile-and-statistics">
                    <Profile />
                    <Statistics />
                </div>
                <MatchHistory />
            </div>
        );
    }
}

export default QueriedInformation;