const upcomingLaunchUrl = "https://api.spacexdata.com/v4/launches/upcoming/";
const upcomingLaunchInfo = document.querySelector(".card");

const launchListData = async () => {
  try {
    const response = await fetch(upcomingLaunchUrl);
    const launchData = await response.json();
    let html = "";

    for (let i = 0; i < launchData.length; i++) {
      const launchName = launchData[i].name;
      const launchDate = launchData[i].date_local.substring(0, 10);
      const launchCrew = launchData[i].crew;
      const launchFlightNumber = launchData[i].flight_number;
      const missionInfo = launchData[i].details;
      const launchPatch = launchData[i].links.patch.small;

      let launchPatchImg = "";
      if (!launchPatch) {
        launchPatchImg = `<img src="./img/no-patch.png" alt="missing mission patch" >`;
      } else {
        launchPatchImg = `<img src="${launchPatch}" alt="mission patch">`;
      }

      upcomingLaunchInfo.innerHTML += `
      <div class="card-content upper">
        <p>${launchName}</p>
        <p>${launchDate}</p>
      </div>
      <div class="card-content bottom">
      ${launchPatchImg}
      <p>${launchFlightNumber}</p>
      </div>
      `;
    }

    html = upcomingLaunchInfo.innerHTML;
  } catch (err) {
    console.log(err);
  }
};

launchListData();
