
import summoners from './datadragon/summoner.json';
import runes from './datadragon/runesReforged.json';
import items from './datadragon/items.json';



let summonerMap = new Map();
let runeMap = new Map();
let itemMap = new Map();
/*
versionData holds data specific to versions. such as items, runes, summs.
generate the most recent version initially, then update only if looking for a game not of this version
{
		12.22.1: {
				items: {}
				runes: {}
				summonerSpells: {}
}
		12.22.2: {
				items: {}
				runes: {}
				summonerSpells: {}
		}
}

*/

for (let i in summoners.data) {
	summonerMap.set(summoners.data[i].key, summoners.data[i].id);
}

for (let i = 0; i < runes.length; i++) {
	let tree = runes[i].slots;
	for (let j = 0; j < tree.length; j++) {
		let runes = tree[j].runes;
		for (let k = 0; k < runes.length; k++) {
			let rune = runes[k];
			runeMap.set(rune.id, rune.icon);
		}
	}
	//for some reason riot doesnt have this in runesreforged.json
	runeMap.set(5001, 'perk-images/StatMods/StatModsHealthScalingIcon.png'); //health
	runeMap.set(5002, 'perk-images/StatMods/StatModsArmorIcon.png'); //armor
	runeMap.set(5003, 'perk-images/StatMods/StatModsMagicResIcon.MagicResist_Fix.png'); //mr
	runeMap.set(5005, 'perk-images/StatMods/StatModsAttackSpeedIcon.png'); //atk speed
	runeMap.set(5007, 'perk-images/StatMods/StatModsCDRScalingIcon.png'); //cdr
	runeMap.set(5008, 'perk-images/StatMods/StatModsAdaptiveForceIcon.png'); //adaptive
}

for (let i in items.data) {
	itemMap.set(i, items.data[i].image.full);
}

//functions
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
	let hours, minutes = 0;
	while (num >= 3600) {
		num -= 3600;
		hours += 1;
	}
	while (num >= 60) {
		num -= 60;
		minutes += 1;
	}
	if (hours) {
		return hours + "h " + minutes + "m " + num + "s";
	}
	else if (minutes) {
		return minutes + "m " + num + "s";
	}
	return num + "s";
}

function getPlayer(puuid, players) {
	for (let i of players) {
		if (i.puuid === puuid) {
			return i;
		}
	}
	return;
}

function round(num, places) {
	let multiplier = Math.pow(10, places);
	return Math.round(num * multiplier) / multiplier;
}


/*

//this is happening too fast, we need to make it wait for versions to fetch all the versions.    
function convertGameVersion(num) {
	for (let j = 0; j < versions.length; j++) {
		let version = versions[j];
		let str1;
		let str2;
		let count = 0;

		for (let i = 0; i < num.length; i++) {
			if (num.charAt(i) === '.') {
				if (count === 0) count += 1;
				else {
					str1 = num.slice(0, i);
					break;
				}

			}
		}
		count = 0;
		for (let i = 0; i < version.length; i++) {
			if (version.charAt(i) === '.') {
				if (count === 0) count += 1;
				else {
					str2 = version.slice(0, i);
					break;
				}
			}
		}

		if (str1 === str2) {
			//if the version given is not the MOST CURRENT version, update the maps(items, runes, summoners) to include it
			if (!(version in versionData)) {
				addVersionData(version);
			}

			return version;
		}
	}
}

function addVersionData(version) {
	versionData[version] = {};
	fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/item.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			versionData[version]['items'] = data;

		})
		.catch(function (error) {
			console.log(error);
		});

	fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/summoner.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			versionData[version]['summonerSpells'] = data;
			versionData[version]['summMap'] = {};
			for (let i in data) {
				versionData[version]['summMap'][data.data[i].key] = data.data[i].id;
			}
		})
		.catch(function (error) {
			console.log(error);
		});

	fetch('http://ddragon.leagueoflegends.com/cdn/' + version + '/data/en_US/runesReforged.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			versionData[version]['runes'] = data;
		})
		.catch(function (error) {
			console.log(error);
		});
}
*/


export { summonerMap, runeMap, itemMap, timeSince, timeFormat, getPlayer, round };