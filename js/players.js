const API = "https://elite-fc-backend.onrender.com/api";

const container = document.getElementById("players-container");

const searchInput = document.getElementById("searchPlayer");
const teamFilter = document.getElementById("teamFilter");

let players = [];

// ==========================
// FETCH PLAYERS FROM BACKEND
// ==========================

async function getPlayers() {
  try {
    const response = await fetch(`${API}/players`);

    const data = await response.json();

    players = data;

    displayPlayers(players);
  } catch (error) {
    console.log("Error fetching players:", error);
  }
}

// ==========================
// DISPLAY PLAYERS
// ==========================

function displayPlayers(playerList) {
  container.innerHTML = "";

  if (playerList.length === 0) {
    container.innerHTML = `
      <h2 style="text-align:center;">
        No player found
      </h2>
    `;

    return;
  }

  playerList.forEach((player) => {
    container.innerHTML += `

    <div class="player-card" id="${player._id}">


      <div class="player-image">

        <img 
        src="players image/${player.image}" 
        alt="${player.name}">

      </div>


      <div class="player-info">


        <h2>
        ${player.name}
        </h2>


        <p>
        <strong>Team:</strong> ${player.team}
        </p>


        <p>
        <strong>Sponsor:</strong> ${player.sponsor}
        </p>



        <div class="player-stats">


          <span>
          ⚽ Goals ${player.goals}
          </span>


          <span>
          🎯 Assists ${player.assists}
          </span>


          <span>
          🏃 Matches ${player.matches}
          </span>


        </div>


      </div>


    </div>

    `;
  });
}

// ==========================
// SEARCH + FILTER
// ==========================

function filterPlayers() {
  const searchValue = searchInput.value.toLowerCase();

  const teamValue = teamFilter.value;

  const filteredPlayers = players.filter((player) => {
    return (
      player.name.toLowerCase().includes(searchValue) &&
      (teamValue === "all" || player.team === teamValue)
    );
  });

  displayPlayers(filteredPlayers);
}

searchInput.addEventListener("input", filterPlayers);

teamFilter.addEventListener("change", filterPlayers);

// ==========================
// START APP
// ==========================

getPlayers();
