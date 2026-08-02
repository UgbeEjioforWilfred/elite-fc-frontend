const API = "https://elite-fc-backend.onrender.com/api";

const token = localStorage.getItem("eliteAdminToken");

if (!token) {
  window.location.href = "login.html";
}

const teamASelect = document.getElementById("teamA");

const teamBSelect = document.getElementById("teamB");

const matchDate = document.getElementById("matchDate");

const round = document.getElementById("round");

const matchNumber = document.getElementById("matchNumber");

const createBtn = document.getElementById("createMatch");

const backBtn = document.getElementById("backBtn");

const logoutBtn = document.getElementById("logoutBtn");

// ==========================
// BACK TO DASHBOARD
// ==========================

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "admin.html";
  });
}

// ==========================
// LOGOUT
// ==========================

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("eliteAdminToken");

    window.location.href = "login.html";
  });
}

// ==========================
// LOAD TEAMS
// ==========================

async function loadTeams() {
  try {
    const response = await fetch(`${API}/teams`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const teams = await response.json();

    teams.forEach((team) => {
      const optionA = document.createElement("option");

      optionA.value = team._id;

      optionA.textContent = team.name;

      teamASelect.appendChild(optionA);

      const optionB = document.createElement("option");

      optionB.value = team._id;

      optionB.textContent = team.name;

      teamBSelect.appendChild(optionB);
    });
  } catch (error) {
    console.log(error);
  }
}

// ==========================
// CREATE MATCH
// ==========================

createBtn.addEventListener("click", async () => {
  if (
    !teamASelect.value ||
    !teamBSelect.value ||
    !matchDate.value ||
    !matchNumber.value
  ) {
    alert("Please fill all fields");

    return;
  }

  if (teamASelect.value === teamBSelect.value) {
    alert("A team cannot play against itself");

    return;
  }

  const matchData = {
    teamA: teamASelect.value,

    teamB: teamBSelect.value,

    matchDate: matchDate.value,

    round: round.value,

    matchNumber: Number(matchNumber.value),

    status: "Upcoming",
  };

  try {
    const response = await fetch(`${API}/matches`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(matchData),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);

      return;
    }

    alert("Match created successfully ⚽");

    window.location.href = "admin.html";
  } catch (error) {
    console.log(error);

    alert("Server error");
  }
});

loadTeams();
