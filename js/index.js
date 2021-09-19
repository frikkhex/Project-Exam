const upcomingLauncUrl = "https://api.spacexdata.com/v4/launches/upcoming/";
const previousLauncUrl = "https://api.spacexdata.com/v4/launches/past/";
const upcomingMissionName = document.querySelector(".upcoming");
const previousMissionName = document.querySelector(".previous");
const countdownTimer = document.querySelector(".card-content_countdown");

const fetchData = async () => {
  try {
    // Finding the first upcoming launch event
    const response = await fetch(upcomingLauncUrl);
    const upcomingLaunchData = await response.json();
    const dateToday = new Date().toISOString();
    let prevLaunchDate = [];
    let upcomingLaunchTime = [];
    let upcomingLaunchDate = [];

    // Looping through upcoming events
    for (let i = 0; i < upcomingLaunchData.length; i++) {
      const launchDate = upcomingLaunchData[i].date_utc;
      const launchDateUnix = upcomingLaunchData[i].date_unix;
      const launchName = upcomingLaunchData[i].name;

      if (launchDate < dateToday) {
        prevLaunchDate.push(launchName);
      } else {
        upcomingLaunchDate.push(launchName);
        upcomingLaunchTime.push(launchDateUnix);
      }
    }

    const closestDate = upcomingLaunchDate[0];
    upcomingMissionName.innerHTML = closestDate;

    // Finding the latest launch registered
    const responsePrev = await fetch(previousLauncUrl);
    const previousLaunchData = await responsePrev.json();
    const latestPreviousLaunch = previousLaunchData.reverse()[0];
    previousMissionName.innerHTML = `${latestPreviousLaunch.name}`;

    // Countdown to launch
    const timeLaunch = upcomingLaunchTime[0];
    const timeNow = new Date().getTime();
    const roundedTimeUnix = timeNow / 1000;
    const newLaunchTime = Math.round(roundedTimeUnix);

    const timeToLaunch = setInterval(function () {
      let timeDifference = timeNow - newLaunchTime;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdownTimer.innerHTML = days + "d " + hours + "h ";

      if (timeDifference < 0) {
        clearInterval(timeToLaunch);
      }
    }, 1000);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Finally");
  }
};

fetchData();
