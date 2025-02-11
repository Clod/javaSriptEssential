const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 'red', 'blue', 'green', 'purple', 'orange', 'pink'];
// Initialized by shuffling and attaching the 'colors' array, this 'cards' array holds the color values for the cards 
// in the game. The shuffle function employs the Fisher-Yates algorithm to randomize the order of the colors and then 
// duplicates these colors to create pairs, forming the set of cards for gameplay.
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startbtn = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container'); // Handler for game-container <div>
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

function generateCards() {
    for (const color of cards) {
        const card = document.createElement('div');
        // Addd card class to card object. card class has grey background
        card.classList.add('card');
        // Assign a color
        card.dataset.color = color;
        // SEt text to ?
        card.textContent = '?';
        // Add the card to the gane-container <div>
        gameContainer.appendChild(card);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(event) {
    // Pick selected clicked element
    const card = event.target;
    // If it is not a card or if it is a card that has already been matched there is nothing to do
    if (!card.classList.contains('card') || card.classList.contains('matched')) {
        return;
    }
    // Set the color of the text of the clicked card  
    card.textContent = card.dataset.color;
    // Set the background color to the card color instad of gray
    card.style.backgroundColor = card.dataset.color;
    // Push in to the list of selected cards
    selectedCards.push(card);
    // If there are two selected cards, check if they match, showing both cards during 500 msecs
    if (selectedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}


function checkMatch() {
    const [card1, card2] = selectedCards;
    // If both colors match
    if (card1.dataset.color === card2.dataset.color) {
        // Add maatched class to both
        // Note that the color was changed before so there is nothing else to do.
        card1.classList.add('matched');
        card2.classList.add('matched');
        // Increase score
        score += 2;
        // Update displayed score
        scoreElement.textContent = `Score: ${score}`;
    } else {
        // No match, show cards in gray  and with text ?
        card1.textContent = '?';
        card2.textContent = '?';
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd';
    }
    selectedCards = [];
}

function startGame() {
    // Overrides de global variable
    let timeLeft = 30;
    startbtn.disabled = true;
    score = 0; // Reset score to zero
    scoreElement.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer(timeLeft) {
    timerElement.textContent = `Time Left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}`;

        if (timeLeft === 0) {
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Game Over!');
            startbtn.disabled = false;
        }
    }, 1000);
}

startbtn.addEventListener('click', startGame);