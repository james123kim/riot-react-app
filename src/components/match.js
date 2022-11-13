import React from 'react';
import queues from './datadragon/queues.json';
import summoners from './datadragon/summoner.json';
import runes from './datadragon/runesReforged.json';

//TODO: i need to do this elsewhere. use context or something. shouldnt calculate this for every match.
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

let summonerMap = new Map();
for (let i in summoners.data) {
  summonerMap.set(summoners.data[i].key, summoners.data[i].id);
}

let runeMap = new Map();
for (let i = 0; i < runes.length; i++) {
  let tree = runes[i].slots;
  for (let j = 0; j < tree.length; j++) {
    let runes = tree[j].runes;
      for (let k = 0; k < runes.length; k++)
      {
        let rune = runes[k];
        runeMap.set(rune.id, rune.icon);
      }
  }
  runeMap.set(5001, 'perk-images/StatMods/StatModsHealthScalingIcon.png'); //health
  runeMap.set(5002, 'perk-images/StatMods/StatModsArmorIcon.png'); //armor
  runeMap.set(5003, 'perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png'); //mr
  runeMap.set(5005, 'perk-images/StatMods/StatModsAttackSpeedIcon.png'); //atk speed
  runeMap.set(5007, 'perk-images/StatMods/StatModsCDRScalingIcon.png'); //cdr
  runeMap.set(5008, 'perk-images/StatMods/StatModsAdaptiveForceIcon.png'); //adaptive
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

function timeFormat(num) {
  let hours, minutes =0;
  while(num>=3600)
  {
    num-=3600;
    hours += 1;
  }
  while(num>=60)
  {
    num-=60;
    minutes += 1;
  }
  if(hours)
  {
    return hours + "h " + minutes + "m " + num + "s";
  }
  else if(minutes)
  {
    return minutes + "m " + num + "s";
  }
  return num + "s";
}

function getPlayer(puuid, players) {
  for(let i of players)
  {
    if(i.puuid == puuid)
    {
      return i;
    }
  }
  return;
}

class Match extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    //md = this.props.matchDetails;
    let player = getPlayer(this.props.summonerData.puuid, this.props.matchDetails.info.participants);
    let win = (player.win==true ? "victory":"defeat");

    return (
      <div className={'match '+ (win)}>
        <div className='matchinfo-box' >
          <p>{queueMap.get(this.props.matchDetails.info.queueId)}</p>
          <p>{timeSince(new Date(this.props.matchDetails.info.gameEndTimestamp))}</p>
          <p>{win}</p>
          <p>{timeFormat(this.props.matchDetails.info.gameDuration)}</p>
        </div>
        <div className='matchinfo-box'>
          <div>
            <div className = 'player'>
              <div>
                <div className = 'champ-summs'>
                  <div className = 'champ-icon'>
                    <img src={'http://ddragon.leagueoflegends.com/cdn/12.21.1/img/champion/'+player.championName+'.png'} width = '60px' height = '60px'/>
                    <span>{player.champLevel}</span>
                  </div>
                  <div className = 'summs'>
                    <div className = 'summ'>
                      <img src={'http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/'+summonerMap.get(''+player.summoner1Id)+'.png'} width = '30px' height = '30px'/>
                    </div>
                    <div className = 'summ'>
                      <img src={'http://ddragon.leagueoflegends.com/cdn/12.21.1/img/spell/'+summonerMap.get(''+player.summoner2Id)+'.png'} width = '30px' height = '30px'/>
                    </div>
                  </div>
                </div>
                <div className = 'items'>
                  <div className = 'items-123'>
                    <img src = {'http://ddragon.leagueoflegends.com/cdn/12.21.1/img/'}/>
                  </div>
                  <div className = 'items-456'>

                  </div>
                </div>
              </div>
              <div className = 'runes'>
                <div className = 'keystone'><img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[0].selections[0].perk)} width = '50px' height = '50px' /></div>
                <div className = 'primary-secondary-runes'>
                  <div className = 'primary-runes'>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[0].selections[1].perk)} width = '30px' height = '30px'/>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[0].selections[2].perk)} width = '30px' height = '30px'/>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[0].selections[3].perk)} width = '30px' height = '30px'/>
                  </div>
                  <div className = 'secondary-runes'>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[1].selections[0].perk)} width = '30px' height = '30px'/>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.styles[1].selections[1].perk)} width = '30px' height = '30px'/>
                  </div>
                  <div className = "shards">
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.statPerks.offense)} width = '30px' height = '30px'/>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.statPerks.flex)} width = '30px' height = '30px'/>
                    <img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get(player.perks.statPerks.defense)} width = '30px' height = '30px'/>
                  </div>
                </div>
                
              </div>
            </div>
            <div className = 'stats'></div>
          </div>
          <div></div>
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
//<img src={'https://ddragon.leagueoflegends.com/cdn/img/'+runeMap.get()} />
export default Match;