
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


export {timeSince, timeFormat, getPlayer, round };