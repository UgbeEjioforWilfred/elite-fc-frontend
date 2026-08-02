const API = "https://elite-fc-backend.onrender.com/api";

const token = localStorage.getItem("eliteAdminToken");

const matchId = localStorage.getItem("selectedMatch");

const teamA = document.getElementById("teamA");

const teamB = document.getElementById("teamB");

const matchDate = document.getElementById("matchDate");

const round = document.getElementById("round");

const saveBtn = document.getElementById("saveMatch");

async function loadData() {
  try {
    const matchResponse = await fetch(`${API}/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const match = await matchResponse.json();

    const teamsResponse = await fetch(`${API}/teams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const teams = await teamsResponse.json();

    teams.forEach((team) => {
      teamA.innerHTML += `

<option value="${team._id}">

${team.name}

</option>

`;

      teamB.innerHTML += `

<option value="${team._id}">

${team.name}

</option>

`;
    });

    teamA.value = match.teamA._id;

    teamB.value = match.teamB._id;

    const date = new Date(match.matchDate);

    matchDate.value = date.toISOString().slice(0, 16);

    round.value = match.round;
  } catch (error) {
    console.log(error);
  }
}

saveBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/matches/${matchId}`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        teamA: teamA.value,

        teamB: teamB.value,

        matchDate: matchDate.value,

        round: round.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    alert("Match updated successfully");

    window.location.href = "admin.html";
  } catch (error) {
    console.log(error);

    alert("Update failed");
  }
});

loadData();
