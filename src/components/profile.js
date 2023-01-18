import React from 'react';

class Profile extends React.Component {
    render() {
        let profileData = this.props.profileData;

        const profiles = [];
        if(profileData.length===0)
        {
            profiles.push(<div key = "1"> no ranked data available </div>);
        }
        else 
        {
            for(let j of profileData)
            {
                profiles.push(
                    <div key={j.queueType}  id = "profile-ranked-info">
                        <div id = "tier-icon"><img src= {require("./datadragon/rankedicons/"+j.tier+ ".png")}/></div>
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
        }

        return (
            <div id = "profile" className = "profile-statistics-item">
                <div className = "profile-container">
                    <div id = "profile-summoner-info">
                        <div id = "summoner-icon"><img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props.mostRecentVersion + "/img/profileicon/"+this.props.summonerData.profileIconId+".png"}/></div>
                        <div id = "name">
                            <h2>{this.props.summonerData.name}</h2> 
                        </div>
                    </div>
                    {profiles}
                </div>
            </div>
        );
    }
}

export default Profile;