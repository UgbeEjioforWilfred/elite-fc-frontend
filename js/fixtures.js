const API = "https://elite-fc-backend.onrender.com/api";

const container = document.getElementById("fixturesContainer");

async function loadFixtures() {
  try {
    const response = await fetch(`${API}/matches`);

    if (!response.ok) {
      throw new Error("Failed to load fixtures");
    }

    const matches = await response.json();

    const upcomingMatches = matches.filter(
      (match) => match.status === "Upcoming",
    );

    upcomingMatches.sort((a, b) => {
      return a.matchNumber - b.matchNumber;
    });

    container.innerHTML = "";

    if (upcomingMatches.length === 0) {
      container.innerHTML = `
        <p>No upcoming matches at the moment.</p>
      `;

      return;
    }

    upcomingMatches.forEach((match) => {
      const date = new Date(match.matchDate);

      let roundTitle = "";

      if (match.round === "3rd Place") {
        roundTitle = "🥉 3rd Place Match";
      } else if (match.round === "Final") {
        roundTitle = "🏆 Final";
      } else if (match.round === "Semi Final") {
        roundTitle = "⚔️ Semi Final";
      } else {
        roundTitle = match.round || "Upcoming Match";
      }

      const card = document.createElement("div");

      card.className = "result-card";

      card.innerHTML = `
        <div class="match-header">
          <p class="round-title">
            ${roundTitle}
          </p>

          <p class="match-number">
            Match #${match.matchNumber || ""}
          </p>
        </div>

        <div class="match-teams">
          <p class="team-name">
            ${match.teamA?.name || "TBD"}
          </p>

          <h3 class="vs">
            VS
          </h3>

          <p class="team-name">
            ${match.teamB?.name || "TBD"}
          </p>
        </div>

        <div class="balltime">
          📅 ${date.toLocaleDateString([], {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}

          <br />

          ⏰ ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Fixtures error:", error);
  }
}

loadFixtures();
