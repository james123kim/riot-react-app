import React from 'react';
import { timeSince, timeFormat, getPlayer, round, } from './functions.js';

class Match extends React.Component {
	constructor(props) {
		super(props);

		this.handleNameClick = this.handleNameClick.bind(this);
	}

	handleNameClick(e) {
		e.preventDefault();
		this.props.onNameClick(e.target.innerHTML);
		window.scrollTo(0, 0);
	}

	render() {
		//md = this.props.matchDetails;
		let player = getPlayer(this.props.summonerData.puuid, this.props.matchDetails.info.participants);
		let win = (player.win === true ? "Victory" : "Defeat");
		let champName = player.championName;
		if (champName === 'FiddleSticks') {
			champName = 'Fiddlesticks';
		}

		//this line needs to be near top, updates datadragon
		let version = this.props.convertGameVersion(this.props.matchDetails.info.gameVersion);
		let versionMap = this.props.versionData[''+version];

		let items123 = [];
		for (let i = 0; i < 3; i++) {
			let str = 'item' + i;
			if (player[str] !== 0) {
				items123.push(<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/item/' + versionMap.itemMap['' + player[str]]}
					alt={versionMap.itemMap['' + player[str]]}
					width='30px'
					height='30px'
					key={'' + i}
				/>);
			}
		}
		let items456 = [];
		for (let i = 3; i < 6; i++) {
			let str = 'item' + i;
			if (player[str] !== 0) {
				items456.push(
					<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/item/' + versionMap.itemMap['' + player[str]]}
						alt={versionMap.itemMap['' + player[str]]}
						width='30px'
						height='30px'
						key={'' + i}
					/>);
			}
		}
		let participants1 = [];
		for (let x of this.props.matchDetails.info.participants) {
			let champ = x.championName;
			if (champ === 'FiddleSticks') champ = 'Fiddlesticks';
			if (x.teamId === 100) {
				let elem;
				if (x.puuid === 'BOT') {
					elem = (<li key={x.summonerName + x.totalDamageTaken}>
						<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + champ + '.png'} alt={x.championName} width='20px' height='20px' />
						<span className='teamIgn'>{x.summonerName}</span>
					</li>);
				}
				else {
					elem = (<li key={x.summonerName + x.totalDamageTaken}>
						<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + champ + '.png'} alt={x.championName} width='20px' height='20px' />
						<button className='teamIgn' onClick={this.handleNameClick}>{x.summonerName}</button>
					</li>);
				}
				participants1.push(elem);
			}
		}
		let participants2 = [];
		for (let x of this.props.matchDetails.info.participants) {
			let champ = x.championName;
			if (champ === 'FiddleSticks') champ = 'Fiddlesticks';
			if (x.teamId === 200) {
				let elem;
				if (x.puuid === 'BOT') {
					elem = (<li key={x.summonerName + x.totalDamageTaken}>
						<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + champ + '.png'} alt={x.championName} width='20px' height='20px' />
						<span className='teamIgn'>{x.summonerName}</span>
					</li>);
				}
				else {
					elem = (<li key={x.summonerName + x.totalDamageTaken}>
						<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + champ + '.png'} alt={x.championName} width='20px' height='20px' />
						<button className='teamIgn' onClick={this.handleNameClick}>{x.summonerName}</button>
					</li>);
				}
				participants2.push(elem);
			}
		}

		return (
			<div className={'match ' + (win)}>
				<div className='matchtype-box' >
					<p>{this.props.queueMap.get(this.props.matchDetails.info.queueId)}</p>
					<p>{timeSince(new Date(this.props.matchDetails.info.gameEndTimestamp))}</p>
					<p>{win}</p>
					<p>{timeFormat(this.props.matchDetails.info.gameDuration)}</p>
				</div>
				<div className='matchinfo-box'>
					<div>
						<div className='player'>
							<div className='champ-summs-items'>
								<div className='champ-summs'>
									<div className='champ-icon'>
										<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/' + champName + '.png'} alt={player.championName} width='60px' height='60px' />
										<span>{player.champLevel}</span>
									</div>
									<div className='summs'>
										<div className='summ'>
											<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/spell/' + versionMap.summMap[player.summoner1Id] + '.png'} alt={player.summoner1Id} width='30px' height='30px' />
										</div>
										<div className='summ'>
											<img src={'http://ddragon.leagueoflegends.com/cdn/' + version + '/img/spell/' + versionMap.summMap[player.summoner2Id] + '.png'} alt={player.summoner2Id} width='30px' height='30px' />
										</div>
									</div>
								</div>
								<div className='items'>
									<div className='items-123'>
										{items123}
									</div>
									<div className='items-456'>
										{items456}
									</div>
								</div>
							</div>
							<div className='runes'>
								<div className='keystone'><img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[0].selections[0].perk]} width='50px' height='50px' /></div>
								<div className='primary-secondary-runes'>
									<div className='primary-runes'>
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[0].selections[1].perk]} alt={versionMap[player.perks.styles[0].selections[1].perk]} width='30px' height='30px' />
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[0].selections[2].perk]} alt={versionMap[player.perks.styles[0].selections[2].perk]} width='30px' height='30px' />
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[0].selections[3].perk]} alt={versionMap[player.perks.styles[0].selections[3].perk]} width='30px' height='30px' />
									</div>
									<div className='secondary-runes'>
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[1].selections[0].perk]} alt={versionMap[player.perks.styles[1].selections[0].perk]} width='30px' height='30px' />
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.styles[1].selections[1].perk]} alt={versionMap[player.perks.styles[1].selections[1].perk]} width='30px' height='30px' />
									</div>
									<div className="shards">
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.statPerks.offense]} alt={versionMap[player.perks.statPerks.offense]} width='30px' height='30px' />
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.statPerks.flex]} alt={versionMap[player.perks.statPerks.flex]} width='30px' height='30px' />
										<img src={'https://ddragon.leagueoflegends.com/cdn/img/' + versionMap.runeMap[player.perks.statPerks.defense]} alt={versionMap[player.perks.statPerks.defense]} width='30px' height='30px' />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='matchstats-box'>
					<h2>{player.kills + ' / ' + player.deaths + ' / ' + player.assists}</h2>
					<p>CS: {player.totalMinionsKilled + player.neutralMinionsKilled} ({round((player.totalMinionsKilled + player.neutralMinionsKilled) / (this.props.matchDetails.info.gameDuration / 60), 2)} CS per min)</p>
					<p>Kill Participation: {round(player.challenges.killParticipation * 100, 1)}%</p>
					<p>Wards: {player.wardsPlaced} Control: {player.detectorWardsPlaced} Killed: {player.wardsKilled}</p>
				</div>
				<div className='participants-box'>
					<ul>
						{participants1}
					</ul>
					<ul>
						{participants2}
					</ul>
				</div>
			</div>
		);
	}
}
export default Match;