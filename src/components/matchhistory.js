import React from 'react';
import Matches from './matches';
import Sidebar from './sidebar';

class MatchHistory extends React.Component {
    render() {
        return (
            <div id = "match-history">
                <Matches />
                <Sidebar />
            </div>
        );
    }
}

export default MatchHistory;