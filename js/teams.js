const API = "https://elite-fc-backend.onrender.com/";

async function loadTeams() {
  try {
    const response = await fetch(`${API}/teams`);

    const teams = await response.json();

    const container = document.querySelector(".teams-container");

    container.innerHTML = "";

    teams.forEach((team) => {
      const teamCard = document.createElement("div");

      teamCard.classList.add("team-card");

      teamCard.innerHTML = `

                <div class="team-header">

    <div>

        <h2>${team.name}</h2>

        <p>
        Sponsor: ${team.sponsor}
        </p>

    </div>

</div>



                <div class="players-list">

                    <h3>Players</h3>


                    <ul>

                    ${team.players
                      .map(
                        (player) => `

                            <li>

                               <a href="players.html?id=${player._id}">
    ${player.name}
</a>


                                <span>
                                    ⚽ ${player.goals}
                                </span>

                            </li>


                        `,
                      )
                      .join("")}

                    </ul>


                </div>


            `;

      container.appendChild(teamCard);
    });
  } catch (error) {
    console.log("Teams Error:", error);
  }
}

loadTeams();
