const previousLaunchUrl = "https://api.spacexdata.com/v4/launches/past";
const container = document.querySelector(".card");
const toggleView = document.querySelector("button");

const previousLaunches = async () => {
  try {
    const response = await fetch(previousLaunchUrl);
    const previousLaunchData = await response.json();
    const latestFirst = previousLaunchData.reverse();

    let html = "";
    for (let i = 0; i < latestFirst.length; i++) {
      const date = latestFirst[i].date_utc.substring(0, 10);
      const patch = latestFirst[i].links.patch.small;
      const name = latestFirst[i].name;
      const youtube = latestFirst[i].links.webcast;
      const launchStatus = latestFirst[i].success;
      const details = latestFirst[i].details;

      if (i === 10) {
        break;
      }

      let successLaunch = "";
      if (launchStatus) {
        successLaunch = `<div class="success">Successful launch</div>`;
      } else {
        successLaunch = `<div class="failure">Failure</div>`;
      }

      let launchDetails = "";
      if (details) {
        launchDetails = details;
      } else {
        launchDetails = "No information available. Please check back later.";
      }

      let launchPatchImg = "";
      if (!patch) {
        launchPatchImg = `<img src="./img/no-patch.png" alt="missing mission patch" >`;
      } else {
        launchPatchImg = `<img src="${patch}" alt="mission patch">`;
      }

      container.innerHTML += `
      <div class="card-timeline">
        <p class="timeline-date">${date}</p>
        <div class="timeline-line"></div>
        <div class="card-outline">
            <div class="card-inline_left">${launchPatchImg}</div>
            <div class="card-inline_right">
                ${successLaunch}
                <h2>${name}</h2>
                <p>${launchDetails}</p>
                <a href="${youtube}">Watch launch<span><img src="./img/youtube.svg" alt="youtube-icon"></span></a>
            </div>
        </div>
        <div class="timeline-line"></div>
      </div>
      `;
    }
    html = container.innerHTML;
  } catch (err) {
    console.log(err);
  }
};

previousLaunches();
