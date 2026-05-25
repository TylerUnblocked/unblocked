const gamesGrid = document.getElementById("games-grid");
const searchInput = document.getElementById("search");

const playerSection = document.getElementById("player-section");
const gameFrame = document.getElementById("game-frame");
const gameTitle = document.getElementById("game-title");
const closeBtn = document.getElementById("close-btn");

let games = [];

// Load Games
async function loadGames() {
  const response = await fetch("games.json");
  games = await response.json();

  displayGames(games);
}

// Display Games
function displayGames(gameList) {
  gamesGrid.innerHTML = "";

  gameList.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML = `
      <div style="width: 100%; height: 140px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center;">
        <h3 style="color: white; text-align: center; padding: 10px;">${game.title}</h3>
      </div>
      <div class="game-info">
        <h3>${game.title}</h3>
      </div>
    `;

    card.addEventListener("click", () => {
      openGame(game);
    });

    gamesGrid.appendChild(card);
  });
}

// Open Game in new tab
function openGame(game) {
window.open(game.url, '_blank');
}

// Close Game
closeBtn.addEventListener("click", () => {
  playerSection.classList.add("hidden");
  gameFrame.src = "";
});

// Search
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = games.filter(game =>
    game.title.toLowerCase().includes(value)
  );

  displayGames(filtered);
});

loadGames();
