import React from 'react';

function round(num, places) {
    var multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
}

function getPlayer(puuid, players) {
    for(let i of players)
    {
      if(i.puuid === puuid)
      {
        return i;
      }
    }
    return;
}
class Statistics extends React.Component {
    render() {
        let puuid = this.props.summonerData.puuid;
        let matches = this.props.matchList;
        let totalGames = matches.length;
        let wins=0, losses=0, totalCs=0, totalSeconds=0, firstDragons=0, enemyFirstDragons = 0, dragonSoul=0, enemyDragonSoul=0;
        
        for(let i =0; i<matches.length; i++)
        {
            let match = matches[i];
            if('message' in match) {
                totalGames-=1;
                continue;
            }
            totalSeconds += match.info.gameDuration;
            let player = getPlayer(puuid, match.info.participants);
            let myTeam, enemyTeam;
            if(match.info.teams[0].teamId === player.teamId) 
            {myTeam = match.info.teams[0]; enemyTeam = match.info.teams[1];}
            else 
            {myTeam = match.info.teams[1]; enemyTeam = match.info.teams[0];}
            if(myTeam.objectives.dragon.first) firstDragons+=1;
            if(enemyTeam.objectives.dragon.first) enemyFirstDragons+=1;
            if(myTeam.objectives.dragon.kills >= 4) dragonSoul+=1;
            if(enemyTeam.objectives.dragon.kills >= 4) enemyDragonSoul+=1;
            if(player.win) wins+=1;
            else losses+=1;
            totalCs+=player.totalMinionsKilled + player.neutralMinionsKilled;
        }

        return (
            <div id = "statistics" className = "profile-statistics-item">
                <h3>Statistics for current set of games</h3>
                <p>winrate: {round(wins/(losses+wins)*100, 2)}%</p>
                <p>average CS per game: {round(totalCs/totalGames,2)} ({round(totalCs/totalSeconds*60,2)}/min)</p>
                <p>ave game time: {round(totalSeconds/60/totalGames, 2)} mins</p>
                <p>first dragon: {round(firstDragons/totalGames,2)}% {round(enemyFirstDragons/totalGames,2)}%</p>
                <p>dragon soul: {round(dragonSoul/totalGames*100,1)}%, {round((totalGames-(dragonSoul+enemyDragonSoul))/totalGames*100,1)}%, {round(enemyDragonSoul/totalGames*100,1)}% enemy</p>
                <p>first rift herald: 30%</p>
                <p>first baron</p>
                <p>first tower: 20% (you: 70% of team's first towers)</p>
                <p>first blood: 40% (you: 80% of team's first bloods)</p>
            </div>
        );
    }
}

export default Statistics;