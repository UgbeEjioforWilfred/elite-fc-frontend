const API = "https://elite-fc-backend.onrender.com/api";

const matchId = localStorage.getItem("selectedMatch");

const token = localStorage.getItem("eliteAdminToken");

let selectedGoals = [];

let currentMatch;

// ==========================
// ELEMENTS
// ==========================

const teams = document.getElementById("teams");

const matchStatus = document.getElementById("matchStatus");

const teamAScore = document.getElementById("teamAScore");

const teamBScore = document.getElementById("teamBScore");

const goalPlayer = document.getElementById("goalPlayer");

const goalMinute = document.getElementById("goalMinute");

const goalList = document.getElementById("goalList");

const addGoalBtn = document.getElementById("addGoal");

const saveBtn = document.getElementById("saveResult");

// ==========================
// CHECK LOGIN
// ==========================

if (!token) {
  window.location.href = "login.html";
}

// ==========================
// LOAD MATCH
// ==========================

async function loadMatch() {
  try {
    const response = await fetch(`${API}/matches/${matchId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const match = await response.json();

    currentMatch = match;

    teams.textContent = `${match.teamA.name} vs ${match.teamB.name}`;

    teamAScore.value = match.teamAScore;

    teamBScore.value = match.teamBScore;

    matchStatus.value = match.status;

    loadPlayers();
  } catch (error) {
    console.log(error);
  }
}

// ==========================
// LOAD PLAYERS
// ==========================

async function loadPlayers() {
  try {
    const response = await fetch(`${API}/players`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const players = await response.json();

    goalPlayer.innerHTML = `

    <option value="">
      Select Player
    </option>

    `;

    players.forEach((player) => {
      const option = document.createElement("option");

      option.value = player._id;

      option.textContent = `${player.name} (${player.team})`;

      goalPlayer.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

// ==========================
// GET PLAYER TEAM
// ==========================

function getPlayerTeam(playerId) {
  const player = [
    ...currentMatch.teamA.players,

    ...currentMatch.teamB.players,
  ].find((p) => p._id === playerId);

  if (currentMatch.teamA.players.some((p) => p._id === playerId)) {
    return currentMatch.teamA._id;
  }

  return currentMatch.teamB._id;
}

// ==========================
// ADD GOAL
// ==========================

addGoalBtn.addEventListener("click", () => {
  const playerId = goalPlayer.value;

  const playerName = goalPlayer.options[goalPlayer.selectedIndex].text;

  const minute = goalMinute.value;

  if (!playerId) {
    alert("Select goal scorer");

    return;
  }

  selectedGoals.push({
    player: playerId,

    team: getPlayerTeam(playerId),

    minute: minute || null,

    playerName,
  });

  displayGoals();

  goalMinute.value = "";
});

// ==========================
// DISPLAY GOALS
// ==========================

function displayGoals() {
  goalList.innerHTML = "";

  selectedGoals.forEach((goal) => {
    const div = document.createElement("div");

    div.className = "goal-item";

    div.innerHTML = `

<span>
⚽ ${goal.playerName}
</span>


<span>
${goal.minute || ""}
'
</span>

`;

    goalList.appendChild(div);
  });
}

// ==========================
// SAVE MATCH
// ==========================

saveBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API}/matches/${matchId}/result`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({
        teamAScore: Number(teamAScore.value),

        teamBScore: Number(teamBScore.value),

        status: matchStatus.value,

        goals: selectedGoals.map((goal) => ({
          player: goal.player,

          team: goal.team,

          minute: goal.minute,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    alert(`Match updated successfully ⚽ Status: ${matchStatus.value}`);

    window.location.href = "admin.html";
  } catch (error) {
    console.log(error);

    alert("Server error");
  }
});

loadMatch();
