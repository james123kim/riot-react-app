import React from 'react';

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

class Match extends React.Component {
    render() {
        return (
            <div className='match'>
                <div className='matchinfo-box'>
                    <p>ranked solo</p>
                    <p>{timeSince(new Date(this.props.matchDetails.info.gameEndTimestamp))}</p>
                </div>
                <div className='championitemsummsrunes-box'>
                    championitemsummsrunes
                </div>
                <div className='matchstats-box'>
                    matchstats
                </div>
                <div className='teamcomp-box'>
                    teamcomp
                </div>
            </div>
        );
    }
}

export default Match;