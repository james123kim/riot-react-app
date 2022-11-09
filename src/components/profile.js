import React from 'react';

class Profile extends React.Component {
    render() {
        let profileData = this.props.profileData;
        if(profileData.length===0)
        {
            return(<div id = "profile" className = "profile-statistics-item"> no ranked data available </div>)
        }

        return (
            <div id = "profile" className = "profile-statistics-item">
                <div className = "profile-container">
                    <div id = "profile-summoner-info">
                        <div id = "summoner-icon"></div>
                        <div id = "name">
                            <h2>{profileData[0].summonerName}</h2> 
                        </div>
                    </div>
                    <div id = "profile-ranked-info">
                        <div id = "tier-icon"></div>
                        <div>
                            <h3>{profileData[0].tier} {profileData[0].rank}</h3>
                            <p>{profileData[0].leaguePoints} lp</p>
                            <p>W:{profileData[0].wins} L:{profileData[0].losses}</p>
                            <p>winrate:{profileData[0].wins/(profileData[0].wins+profileData[0].losses) *100}%</p>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;