const API = "https://elite-fc-backend.onrender.com/";

async function loadResults() {
  try {
    const response = await fetch(`${API}/matches`);

    const matches = await response.json();

    const container = document.querySelector(".results-container");

    container.innerHTML = "";

    // Only finished matches

    const finishedMatches = matches.filter(
      (match) => match.status === "Finished",
    );

    // Latest matches first

    finishedMatches.sort((a, b) => {
      return new Date(b.matchDate) - new Date(a.matchDate);
    });

    if (finishedMatches.length === 0) {
      container.innerHTML = `

        <p>
          No results available yet.
        </p>

      `;

      return;
    }

    finishedMatches.forEach((match) => {
      const date = new Date(match.matchDate);

      const card = document.createElement("div");

      card.classList.add("result-card");

      card.innerHTML = `


        <p>
          ${match.teamA.name}
        </p>



        <h3>
          ${match.teamAScore} - ${match.teamBScore}
        </h3>



        <p>
          ${match.teamB.name}
        </p>



        <div class="balltime">


          <time>

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


          </time>


        </div>



      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Results error:", error);
  }
}

loadResults();
