const upcomingLauncUrl = "https://api.spacexdata.com/v4/launches/upcoming/";
const previousLauncUrl = "https://api.spacexdata.com/v4/launches/past/";
const upcomingMissionName = document.querySelector(".upcoming");
const previousMissionName = document.querySelector(".previous");

const fetchData = async () => {
  try {
    // Finding the first upcoming launch event
    const response = await fetch(upcomingLauncUrl);
    const upcomingLaunchData = await response.json();
    const dateToday = new Date().toISOString();
    let prevLaunchDate = [];
    let upcomingLaunchDate = [];

    // Looping through upcoming events
    for (let i = 0; i < upcomingLaunchData.length; i++) {
      const launchDate = upcomingLaunchData[i].date_utc;
      const launchName = upcomingLaunchData[i].name;

      if (launchDate < dateToday) {
        prevLaunchDate.push(launchName);
      } else {
        upcomingLaunchDate.push(launchName);
      }
    }

    const closestDate = upcomingLaunchDate[0];
    upcomingMissionName.innerHTML = closestDate;

    // Finding the latest launch registered
    const responsePrev = await fetch(previousLauncUrl);
    const previousLaunchData = await responsePrev.json();
    const latestPreviousLaunch = previousLaunchData.reverse()[0];
    previousMissionName.innerHTML = latestPreviousLaunch.name;
  } catch (err) {
    console.log(err);
  }
};

fetchData();
