import React from 'react';

class ProfileRankedInfo extends React.Component {
    render() {
        return (
            <div id = "profile-ranked-info">
                <div id = "tier-icon"></div>
                <div>
                    <h3>Master I</h3>
                    <p>286 lp</p>
                    <p>W:100 L:100</p>
                    <p>winrate: 50%</p>
                </div> 
            </div>
        );
    }
}

export default ProfileRankedInfo;