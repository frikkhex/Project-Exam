const upcomingLaunchUrl = "https://api.spacexdata.com/v4/launches/upcoming/";
const previousLaunchUrl = "https://api.spacexdata.com/v4/launches/past/";
const upcomingMissionName = document.querySelector(".upcoming");
const previousMissionName = document.querySelector(".previous");

const fetchData = async () => {
	try {
		// Finding the first upcoming launch event
		const response = await fetch(upcomingLaunchUrl);
		const upcomingLaunchData = await response.json();
		const dateToday = new Date().toISOString();
		let prevLaunchName = [];
		let upcomingLaunchTime = [];
		let upcomingLaunchName = [];
		let upcomingLaunchDate = [];

		// Looping through upcoming events
		for (let i = 0; i < upcomingLaunchData.length; i++) {
			const launchDate = upcomingLaunchData[i].date_utc;
			const launchDateUnix = upcomingLaunchData[i].date_unix;
			const launchDateLocal = upcomingLaunchData[i].date_local;
			const launchName = upcomingLaunchData[i].name;

			if (launchDate < dateToday) {
				prevLaunchName.push(launchName);
			} else {
				upcomingLaunchName.push(launchName);
				upcomingLaunchTime.push(launchDateLocal);
			}
		}

		const closestDate = upcomingLaunchName[0];
		upcomingMissionName.innerHTML = closestDate;

		// Finding the latest launch registered
		const responsePrev = await fetch(previousLaunchUrl);
		const previousLaunchData = await responsePrev.json();
		const latestPreviousLaunch = previousLaunchData.reverse()[0];
		previousMissionName.innerHTML = `${latestPreviousLaunch.name}`;

		// Countdown to launch
		const days = document.querySelector("#days");
		const hours = document.querySelector("#hours");
		const minutes = document.querySelector("#minutes");
		const seconds = document.querySelector("#seconds");

		const timeLaunch = upcomingLaunchTime[0];
		const timeNow = new Date().getTime();
		const newTime = new Date(timeLaunch).getTime();

		// Timer
		const timeToLaunch = setInterval(function () {
			let timeDifference = newTime - timeNow;

			const daysTimer = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
			const hoursTimer = Math.floor(
				(timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutesTimer = Math.floor(
				(timeDifference % (1000 * 60 * 60)) / (1000 * 60)
			);
			const secondsTimer = Math.floor((timeDifference % (1000 * 60)) / 1000);

			if (timeDifference < 0) {
				clearInterval(timeToLaunch);
			}
			days.innerHTML = `${daysTimer} days`;
			// hours.innerHTML = `${hoursTimer}:`;
			// minutes.innerHTML = `${minutesTimer}:`;
			// seconds.innerHTML = `${secondsTimer}`;
		});
	} catch (err) {
		console.log(err);
	} finally {
		console.log("Finally");
	}
};

fetchData();
