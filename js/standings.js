const API = "https://elite-fc-backend.onrender.com/";

// ==========================
// LOAD STANDINGS
// ==========================

async function loadStandings() {
  try {
    const response = await fetch(`${API}/standings`);

    const teams = await response.json();

    const groupA = teams.filter((team) => team.group === "A").sort(sortTable);

    const groupB = teams.filter((team) => team.group === "B").sort(sortTable);

    displayGroup(groupA, "groupA-body");

    displayGroup(groupB, "groupB-body");
  } catch (error) {
    console.log("Standings error:", error);
  }
}

// ==========================
// LOAD TOP SCORERS
// ==========================

async function loadTopScorers() {
  try {
    const response = await fetch(`${API}/players`);

    const players = await response.json();

    // REMOVE PLAYERS WITH ZERO GOALS

    const scorers = players.filter((player) => player.goals > 0);

    // SORT HIGHEST GOALS FIRST

    scorers.sort((a, b) => b.goals - a.goals);

    const topPlayers = scorers.slice(0, 5);

    const list = document.getElementById("topScorersList");

    list.innerHTML = "";

    topPlayers.forEach((player) => {
      const li = document.createElement("li");

      li.innerHTML = `

      <a href="player-profile.html?id=${player._id}">
        ${player.name}
      </a>

      <span>
        ${player.team} - ${player.goals} Goal${player.goals !== 1 ? "s" : ""}
      </span>

      `;

      list.appendChild(li);
    });
  } catch (error) {
    console.log("Top scorer error:", error);
  }
}

// ==========================
// LOAD TOURNAMENT STATS
// ==========================

async function loadTournamentStats() {
  try {
    const response = await fetch(`${API}/stats`);

    const data = await response.json();

    document.getElementById("matchesPlayed").textContent = data.matchesPlayed;

    document.getElementById("totalGoals").textContent = data.totalGoals;
  } catch (error) {
    console.log("Stats error:", error);
  }
}

// ==========================
// SORT TABLE
// ==========================

function sortTable(a, b) {
  if (b.points !== a.points) {
    return b.points - a.points;
  }

  return b.goalDifference - a.goalDifference;
}

// ==========================
// DISPLAY TABLE
// ==========================

function displayGroup(teams, elementId) {
  const tbody = document.getElementById(elementId);

  tbody.innerHTML = "";

  teams.forEach((team) => {
    const row = document.createElement("tr");

    row.innerHTML = `

<td>${team.name}</td>

<td>${team.played}</td>

<td>${team.goalsFor}</td>

<td>${team.goalsAgainst}</td>

<td>${team.goalDifference}</td>

<td>
<strong>${team.points}</strong>
</td>

`;

    tbody.appendChild(row);
  });
}

loadStandings();

loadTopScorers();

loadTournamentStats();
