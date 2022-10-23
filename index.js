const container = document.querySelector('.container'),
     title = document.querySelector('h1'),
     start = document.querySelector('button');

let btns = document.querySelectorAll('.btn');
let gameCounter = []; 
let playerCounter = [];
let level = 0;
let counter = 0;

container.classList.add('unclickable');

container.addEventListener('click', (e) => {
    if(e.target && e.target.classList.contains('btn')) {
        yourTurn(e);
    }
}); 

start.addEventListener('click', () => {
    start.classList.add('unclickable');
    game(); 
    
});

    
function game() {

    level += 1;
    
    const tiles = ['green', 'red', 'yellow', 'blue'];

    let current = tiles[Math.floor(Math.random() * tiles.length)];
    gameCounter.push(current);
    title.textContent = `Level ${level}`;


    gameCounter.forEach((color, i) => {
        setTimeout(() => {
            buttonPress(color);
        }, (i+1)*600);
    });


    setTimeout(() => {
        container.classList.remove('unclickable');

    }, level * 600 + 1000);
}


function yourTurn(event) {
    
    let playerCurrent = event.target.getAttribute('data-color');
    console.log(playerCounter)
    buttonPress(playerCurrent);
    check(playerCurrent);
}

function check(playerCurrent) {
    playerCounter.push(playerCurrent);
    const index = playerCounter.indexOf(playerCurrent);

    if (gameCounter[index] !== playerCounter[index]) {
        title.textContent = 'Oops! Game over, you pressed the wrong tile. Press "START" button to try again!';
        resetStats();
        return;
    }

    if (gameCounter.length === playerCounter.length) {
        console.log('Success! Keep going!');

        playerCounter = [];
        container.classList.add('unclickable');

        game();

        return;
    } 

}

function buttonPress(color) {

    const btn = document.querySelector(`#${color}`);
    btn.classList.add('pressed');
    const audio = new Audio(`/sounds/${color}.mp3`);
    audio.play();

    setTimeout(()=> {
        btn.classList.remove('pressed');
    }, 300)
}

function resetStats() {
    start.classList.remove('unclickable');
    container.classList.add('unclickable');

    gameCounter = [];
    playerCounter = [];
    level = 0;
}

