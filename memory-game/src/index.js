const countries = [
    { name: "USA", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Argentina", flag: "🇦🇷" },
    { name: "France", flag: "🇫🇷" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "UK", flag: "🇬🇧" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "China", flag: "🇨🇳" },
    { name: "India", flag: "🇮🇳" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "Russia", flag: "🇷🇺" },
];

const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container", "grid");
document.body.appendChild(gameContainer);

let cardValues = [...countries, ...countries];
cardValues.sort(() => 0.5 - Math.random());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentPlayer = 1; // 1 for green, 2 for red

function createCard(country) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = country.name;

    const front = document.createElement("div");
    front.classList.add("front");
    front.textContent = "?";

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = country.flag;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");
    this.classList.remove("player-red", "player-green");
    if (currentPlayer === 2) {
        this.classList.add("player-red");
    } else {
        this.classList.add("player-green");
    }

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flip", "player-red", "player-green");
        secondCard.classList.remove("flip", "player-red", "player-green");
        resetBoard();
        switchPlayer();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.body.className = currentPlayer === 1 ? 'player-green' : 'player-red';
}

function startGame() {
    cardValues.forEach(createCard);
    document.body.className = 'player-green'; // Start with player 1 (green)
}

startGame();