const API = "https://elite-fc-backend.onrender.com/";

const token = localStorage.getItem("eliteAdminToken");

if (!token) {
  window.location.href = "login.html";
}

const upcomingContainer = document.getElementById("upcomingMatches");

const liveContainer = document.getElementById("liveMatches");

const completedContainer = document.getElementById("completedMatches");

const logoutBtn = document.getElementById("logoutBtn");

const createMatchBtn = document.getElementById("createMatchBtn");

// CREATE MATCH BUTTON

if (createMatchBtn) {
  createMatchBtn.addEventListener("click", () => {
    window.location.href = "create-match.html";
  });
}

// LOGOUT

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("eliteAdminToken");

  window.location.href = "login.html";
});

// LOAD MATCHES

async function loadMatches() {
  try {
    const response = await fetch(`${API}/matches`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const matches = await response.json();

    // SORT BY DATE

    matches.sort((a, b) => {
      return new Date(a.matchDate) - new Date(b.matchDate);
    });

    upcomingContainer.innerHTML = "";

    liveContainer.innerHTML = "";

    completedContainer.innerHTML = "";

    matches.forEach((match) => {
      const card = document.createElement("div");

      card.className = "match-card";

      let scoreDisplay;

      if (match.status === "Upcoming") {
        scoreDisplay = "vs";
      } else {
        scoreDisplay = `${match.teamAScore} - ${match.teamBScore}`;
      }

      card.innerHTML = `

<div class="match-teams">


<span>
${match.teamA.name}
</span>


<span class="${match.status === "Live" ? "live-score" : ""}">

${scoreDisplay}

</span>


<span>
${match.teamB.name}
</span>


</div>




<div class="match-date">

📅 
${new Date(match.matchDate).toLocaleDateString([], {
  day: "2-digit",

  month: "short",

  year: "numeric",
})}


<br>


⏰
${new Date(match.matchDate).toLocaleTimeString([], {
  hour: "2-digit",

  minute: "2-digit",
})}


</div>




<div class="match-info">


<span>
${match.round}
</span>


<span>

${match.status === "Live" ? "🔴 LIVE" : match.status}

</span>


</div>




<button
class="update-btn"
data-id="${match._id}">
Update Match
</button>



<button
class="edit-btn"
data-id="${match._id}">
Edit Match
</button>



<button
class="delete-btn"
data-id="${match._id}">
Delete Match
</button>


`;

      // SEPARATE SECTIONS

      if (match.status === "Upcoming") {
        upcomingContainer.appendChild(card);
      } else if (match.status === "Live") {
        liveContainer.appendChild(card);
      } else if (match.status === "Finished") {
        completedContainer.appendChild(card);
      }
    });

    // UPDATE BUTTONS

    document.querySelectorAll(".update-btn").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem("selectedMatch", button.dataset.id);

        window.location.href = "update-match.html";
      });
    });

    // EDIT BUTTONS

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem("selectedMatch", button.dataset.id);

        window.location.href = "edit-match.html";
      });
    });

    // DELETE BUTTONS

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const matchId = button.dataset.id;

        const confirmDelete = confirm(
          "Are you sure you want to delete this match?",
        );

        if (!confirmDelete) return;

        try {
          const response = await fetch(`${API}/matches/${matchId}`, {
            method: "DELETE",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (!response.ok) {
            alert(data.message);

            return;
          }

          alert("Match deleted successfully");

          loadMatches();
        } catch (error) {
          console.log(error);

          alert("Delete failed");
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

loadMatches();
