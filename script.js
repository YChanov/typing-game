const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game

const words = ["curiosities", "wellaway", "underrated", "toxaemic", "presbyter", "flossily", "focusless", "undress", "hornstone", "brinies", "galantines", "raspish", "tiltrotor", "aortographies", "stenchful", "honeybuns", "brannier", "equipage", "strunts", "fluoroscopist", "bescorched", "bedrugging", "linos", "riming", "mediaevals", "florescent", "ghosting", "hobs", "diffractometer", "bombesins", "designating", "photosynthesis", "maneuver", "reinfestations", "gibbetting", "brulzies", "roughnecks", "campaniles", "barbels", "piranhas", "seizin", "fumigations", "glycosylating", "parrots", "breccias", "cachinnated", "antiseptics", "tapeta", "gild", "cachexies"];

//Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

// Start counting down
let timeInterval = setInterval(updateTime, 1000);

//Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

//Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);

        // Eng game
        gameOver();
    }
}

// Game over show endscreen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onClick="location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event Listeners

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        //clear text
        e.target.value = '';

        switch (difficulty) {
            case 'easy': time += 5;
                break;
            case 'medium': time += 3;
                break;
            case 'hard': time += 2;
                break;
            default: time += 5;
        }

        updateTime()
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});