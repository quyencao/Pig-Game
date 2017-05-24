/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    // if game playing is false not do anything
    if(!gamePlaying) return;
    
    // Random a dice
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // Show dice AND change image src same as dice number
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    if(dice !== 1) {
        // Add Score to roundScore
        roundScore += dice;
        // Set roundScore to UI
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    // if game playing is false not do anything
    if(!gamePlaying) return;
    // Add roundScore to current active player global score
    scores[activePlayer] += roundScore;
    // Set global score UI
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
    // Check player won the game
    if(scores[activePlayer] >= 20) {
        // End Game
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        // Game is not playing now
        gamePlaying = false;
    } else {
        // Change turn to other player
        nextPlayer();
    }
    
});

// New Game Event
document.querySelector('.btn-new').addEventListener('click', init);

// Init the game
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    // Hide the dice
    document.querySelector('.dice').style.display = 'none';

    // Reset All roundScore and global score UI
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    // Set Player Name Back
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Remove active class
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // Remove Winner Class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    // Add active class to player 0
    document.querySelector('.player-0-panel').classList.add('active');
    
}

function nextPlayer() {
    // Make the other player is active
    activePlayer = activePlayer === 1 ? 0 : 1;
    // Reset roundScore to count to other player
    roundScore = 0;
    // Reset roundScore UI
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
        
    // Change active style to other player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    // Hide the dice
    document.querySelector('.dice').style.display = 'none';
}       

}