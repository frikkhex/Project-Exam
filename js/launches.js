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
      const launchCrew = launchData[i].crew.length;
      const missionInfo = launchData[i].details;
      const launchPatch = launchData[i].links.patch.small;

      let launchPatchImg = "";
      if (!launchPatch) {
        launchPatchImg = `<img src="./img/no-patch.png" alt="missing mission patch" >`;
      } else {
        launchPatchImg = `<img src="${launchPatch}" alt="mission patch">`;
      }

      let launchCrewMembers = "";
      if (!launchCrew) {
        launchCrewMembers = "This launch has not updated its crew members.";
      } else {
        launchCrewMembers = `${launchCrew} crew members on this planned launch.`;
      }

      let launchMissionInfo = "";
      if (!missionInfo) {
        launchMissionInfo = " No available information. Please check back later.";
      } else {
        launchMissionInfo = " " + missionInfo;
      }

      upcomingLaunchInfo.innerHTML += `
      <div class="card-content upper ">
        <p id="launch-name">${launchName}</p>
        <p>${launchDate}</p>
      </div>
      <div class="card-content bottom launch-info">
            ${launchPatchImg}
            <hr/>
            <p><span>Mission name</span>${launchName}</p>
            <p><span>Mission info</span>${launchMissionInfo}</p>
            <p><span>Crew info</span>${launchCrewMembers}</p>

      </div>
      `;
    }

    html = upcomingLaunchInfo.innerHTML;
  } catch (err) {
    console.log(err);
  }
};

launchListData();
