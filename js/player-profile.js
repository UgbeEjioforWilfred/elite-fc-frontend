const API = "https://elite-fc-backend.onrender.com/";

const params = new URLSearchParams(window.location.search);

const playerId = params.get("id");

async function loadPlayer() {
  try {
    const response = await fetch(`${API}/players/${playerId}`);

    const player = await response.json();

    document.getElementById("playerName").textContent = player.name;

    document.getElementById("playerTeam").textContent = player.team;

    document.getElementById("playerMatches").textContent = player.matches;

    document.getElementById("playerGoals").textContent = player.goals;

    document.getElementById("playerAssists").textContent = player.assists;

    document.getElementById("playerImage").src = `images/${player.image}`;
  } catch (error) {
    console.log(error);
  }
}

loadPlayer();
