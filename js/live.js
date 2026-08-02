const API = "https://elite-fc-backend.onrender.com/api";

const container = document.getElementById("liveMatchesContainer");

async function loadLiveMatches() {
  try {
    const response = await fetch(`${API}/matches`);

    if (!response.ok) {
      throw new Error("Failed to load matches");
    }

    const matches = await response.json();

    const liveMatches = matches.filter((match) => match.status === "Live");

    container.innerHTML = "";

    if (liveMatches.length === 0) {
      container.innerHTML = `
        <p>
          No live matches currently.
        </p>
      `;

      return;
    }

    liveMatches.forEach((match) => {
      const date = new Date(match.matchDate);

      const card = document.createElement("div");

      card.className = "result-card";

      card.innerHTML = `


        <p>
          🔴 LIVE NOW
        </p>


        <p>
          ${match.teamA?.name || "Unknown Team"}
        </p>


        <h3>
          ${match.teamAScore} - ${match.teamBScore}
        </h3>


        <p>
          ${match.teamB?.name || "Unknown Team"}
        </p>


        <div class="balltime">


          📅 ${date.toLocaleDateString([], {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}


          <br>


          ⏰ ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}


        </div>


      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Live matches error:", error);
  }
}

loadLiveMatches();
