import React from 'react';

class Profile extends React.Component {
    render() {
        let profileData = this.props.profileData;
        if(profileData.length===0)
        {
            return(<div id = "profile" className = "profile-statistics-item"> no ranked data available </div>)
        }

        for(let j of profileData)
        {
            
        }
        const profiles = [];
        for(let j of profileData)
        {
            profiles.push(
                <div key={j.queueType}  id = "profile-ranked-info">
                    <div id = "tier-icon"></div>
                    <div>
                        <h3>{j.tier} {j.rank}</h3>
                        <p>{j.queueType}</p>
                        <p>{j.leaguePoints} lp</p>
                        <p>W:{j.wins} L:{j.losses}</p>
                        <p>winrate:{j.wins/(j.wins+j.losses) *100}%</p>
                    </div> 
                </div>
            );
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
                    {profiles}
                </div>
            </div>
        );
    }
}

export default Profile;