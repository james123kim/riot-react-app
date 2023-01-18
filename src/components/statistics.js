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
        let wins=0, losses=0, totalCs=0, totalSeconds=0, firstDragons=0, enemyFirstDragons = 0, dragonSoul=0, enemyDragonSoul=0, firstRiftHeralds=0, enemyFirstRiftHeralds=0, secondRiftHeralds=0, enemySecondRiftHeralds=0, firstBarons=0, enemyFirstBarons=0, firstTowers=0, enemyFirstTowers=0, firstBloods=0, enemyFirstBloods=0, playerFirstBloods=0, playerFirstTowers=0;
        
        for(let i=0; i<matches.length; i++)
        {
            let match = matches[i];
            //if a match didnt load - usually rate limiting issue
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
            else if(enemyTeam.objectives.dragon.first) enemyFirstDragons+=1;
            if(myTeam.objectives.dragon.kills >= 4) dragonSoul+=1;
            if(enemyTeam.objectives.dragon.kills >= 4) enemyDragonSoul+=1;
            if(player.win) wins+=1;
            else losses+=1;
            totalCs+=player.totalMinionsKilled + player.neutralMinionsKilled;

            let myRift = myTeam.objectives.riftHerald, enemyRift = enemyTeam.objectives.riftHerald;
            if(myRift.first == true) firstRiftHeralds+=1;
            if(enemyRift.first == true) enemyFirstRiftHeralds+=1;
            if(myRift.kills == 2 || myRift.first == false && myRift.kills == 1) secondRiftHeralds+=1;
            if(enemyRift.kills == 2 || enemyRift.first == false && enemyRift.kills ==1) enemySecondRiftHeralds+=1;

            if(myTeam.objectives.baron.first ==true) firstBarons+=1;
            else if(enemyTeam.objectives.baron.first == true) enemyFirstBarons+=1;

            if(myTeam.objectives.tower.first == true) firstTowers+=1;
            else if(enemyTeam.objectives.tower.first ==true) enemyFirstTowers+=1;

            if(myTeam.objectives.champion.first ==true) firstBloods+=1;
            else if(enemyTeam.objectives.champion.first ==true) enemyFirstBloods+=1;

            if(player.firstBloodAssist || player.firstBloodKill) playerFirstBloods+=1;
            if(player.firstTowerAssist || player.firstTowerKill) playerFirstTowers+=1;
        }

        return (
            <div id = "statistics" className = "profile-statistics-item">
                <div>
                    <h3>Statistics for current set of games</h3>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: wins/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: losses/totalGames*100+"%"}}></div>
                    </div>
                    <p>winrate: {round(wins/(losses+wins)*100, 2)}%</p>
                </div>
                <div><p>average CS per game: {round(totalCs/totalGames,2)} ({round(totalCs/totalSeconds*60,2)}/min)</p></div>
                <div><p>ave game time: {round(totalSeconds/60/totalGames, 2)} mins</p></div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: firstDragons/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-firstDragons-enemyFirstDragons)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyFirstDragons/totalGames*100+"%"}}></div>
                    </div>
                    <p>first dragon: {round(firstDragons/totalGames*100,2)}% {round(enemyFirstDragons/totalGames*100,2)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: dragonSoul/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-dragonSoul-enemyDragonSoul)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyDragonSoul/totalGames*100+"%"}}></div>
                    </div>
                    <p>dragon soul: {round(dragonSoul/totalGames*100,1)}%, {round((totalGames-(dragonSoul+enemyDragonSoul))/totalGames*100,1)}%, {round(enemyDragonSoul/totalGames*100,1)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: firstRiftHeralds/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-firstRiftHeralds-enemyFirstRiftHeralds)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyFirstRiftHeralds/totalGames*100+"%"}}></div>
                    </div>
                    <p>first rift herald: {round(firstRiftHeralds/totalGames*100,2)}% {round(enemyFirstRiftHeralds/totalGames*100,2)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: secondRiftHeralds/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-secondRiftHeralds-enemySecondRiftHeralds)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemySecondRiftHeralds/totalGames*100+"%"}}></div>
                    </div>
                    <p>second rift herald: {round(secondRiftHeralds/totalGames*100,2)}% {round(enemySecondRiftHeralds/totalGames*100,2)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: firstBarons/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-firstBarons-enemyFirstBarons)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyFirstBarons/totalGames*100+"%"}}></div>
                    </div>
                    <p>first baron: {round(firstBarons/totalGames*100,2)}% {round(enemyFirstBarons/totalGames*100,2)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: firstTowers/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-firstTowers-enemyFirstTowers)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyFirstTowers/totalGames*100+"%"}}></div>
                    </div>
                    <p>first tower: {round(firstTowers/totalGames*100,2)}% (you: {round(playerFirstTowers/firstTowers*100,2)}% of team's first towers) {round(enemyFirstTowers/totalGames*100,2)}%</p>
                </div>
                <div>
                    <div className = "percent-bar">
                        <div className = "percent-bar-blue" style = {{width: firstBloods/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-gray" style = {{width: (totalGames-firstBloods-enemyFirstBloods)/totalGames*100+"%"}}></div>
                        <div className = "percent-bar-red" style = {{width: enemyFirstBloods/totalGames*100+"%"}}></div>
                    </div>
                    <p>first blood: {round(firstBloods/totalGames*100,2)}% (you: {round(playerFirstBloods/firstBloods*100,2)}% of team's first bloods) {round(enemyFirstBloods/totalGames*100,2)}%</p>
                </div>
            </div>
        );
    }
}

export default Statistics;