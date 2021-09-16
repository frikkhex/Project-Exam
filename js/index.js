const upcomingLaunchesUrl = "https://api.spacexdata.com/v4/launches/upcoming";
const upcomingLaunchInput = document.querySelector(".mission-name");
console.log(upcomingLaunchInput.innerHTML);

const fetchData = async () => {
  try {
    const response = await fetch(upcomingLaunchesUrl);
    const json = await response.json();
    const data = json;

    const upcomingLaunch = data[0].name;
    const upcomingLaunchCountdown = data[0].date_utc;
    console.log(upcomingLaunchCountdown.);

    upcomingLaunchInput.innerHTML = upcomingLaunch;

    console.log(upcomingLaunch);
  } catch (err) {
    console.log(err);
  }
};

fetchData();
