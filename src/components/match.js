import React from 'react';
import queues from './datadragon/queues.json';

let queueMap = new Map();
for (let i = 0; i < queues.length; i++) {
  let str;
  if (i === 0) str = queues[i].map;
  else str = queues[i].description;
  if (str.length > 6 && str.slice(-6) === ' games') {
    str = str.slice(0, -6);
  }
  queueMap.set(queues[i].queueId, str);
}

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
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className='match'>
        <div className='matchinfo-box'>
          <p>{queueMap.get(this.props.matchDetails.info.queueId)}</p>
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