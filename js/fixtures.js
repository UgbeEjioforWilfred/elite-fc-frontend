const API = "https://elite-fc-backend.onrender.com/";

const container = document.getElementById("fixturesContainer");

async function loadFixtures() {
  try {
    const response = await fetch(`${API}/matches`);

    const matches = await response.json();

    // Only upcoming matches

    const upcomingMatches = matches.filter(
      (match) => match.status === "Upcoming",
    );

    // Sort by match number

    upcomingMatches.sort((a, b) => {
      return a.matchNumber - b.matchNumber;
    });

    container.innerHTML = "";

    upcomingMatches.forEach((match) => {
      const date = new Date(match.matchDate);

      const card = document.createElement("div");

      card.className = "result-card";

      card.innerHTML = `


        <p>
          Match #${match.matchNumber || ""}
        </p>



        <p>
          ${match.teamA.name}
        </p>



        <h3>
          vs
        </h3>



        <p>
          ${match.teamB.name}
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
    console.log("Fixtures error:", error);
  }
}

loadFixtures();
