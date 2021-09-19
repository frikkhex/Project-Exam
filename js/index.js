const upcomingLaunchUrl = "https://api.spacexdata.com/v4/launches/upcoming/";
const previousLaunchUrl = "https://api.spacexdata.com/v4/launches/past/";
const upcomingMissionName = document.querySelector(".upcoming");
const previousMissionName = document.querySelector(".previous");
const upcomingLaunchDate = document.querySelector("#launch-date");
const previousLaunchDate = document.querySelector("#prevLaunchDate");

const fetchData = async () => {
  try {
    // Finding the first upcoming launch event
    const response = await fetch(upcomingLaunchUrl);
    const upcomingLaunchData = await response.json();
    console.log(upcomingLaunchData);
    const dateToday = new Date().toISOString();
    let prevLaunchName = [];
    let upcomingLaunchTime = [];
    let upcomingLaunchName = [];

    // Looping through upcoming events
    for (let i = 0; i < upcomingLaunchData.length; i++) {
      const launchDate = upcomingLaunchData[i].date_utc;
      const launchDateLocal = upcomingLaunchData[i].date_local;
      const launchName = upcomingLaunchData[i].name;

      if (launchDate < dateToday) {
        prevLaunchName.push(launchName);
      } else {
        upcomingLaunchName.push(launchName);
        upcomingLaunchTime.push(launchDateLocal);
      }
    }

    upcomingMissionName.innerHTML = upcomingLaunchName[0];
    upcomingLaunchDate.innerHTML = upcomingLaunchTime[0].substring(0, 10);

    // Finding the latest launch registered
    const responsePrev = await fetch(previousLaunchUrl);
    const previousLaunchData = await responsePrev.json();
    const latestPreviousLaunch = previousLaunchData.reverse()[0];
    previousMissionName.innerHTML = `${latestPreviousLaunch.name}`;
    previousLaunchDate.innerHTML = `${latestPreviousLaunch.date_local.substring(0, 10)}`;

    // Countdown to launch
    const days = document.querySelector("#days");

    const timeLaunch = upcomingLaunchTime[0];
    const timeNow = new Date().getTime();
    const newTime = new Date(timeLaunch).getTime();

    // Timer
    const timeToLaunch = () => {
      let timeDifference = newTime - timeNow;

      const daysTimer = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      days.innerHTML = `${daysTimer} days`;
    };
    timeToLaunch();
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Finally");
  }
};

fetchData();
