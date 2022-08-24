import React from 'react';
import ProfileSummonerInfo from './profilesummonerinfo';
import ProfileRankedInfo from './profilerankedinfo';

class Profile extends React.Component {
    render() {
        return (
            <div id = "profile" className = "profile-statistics-item">
                <ProfileSummonerInfo />
                <ProfileRankedInfo />
            </div>
        );
    }
}

export default Profile;