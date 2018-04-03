/*Brian Walsh Project 4 Tic-Tac-Toe
The player to start the game is always chosen by random.
Player names are optional. 
The setTimeout() is to make the game more user friendly.
I used mouse-enter/ mouse-leave not mouse-hover, so move the mouse
if the square is not being highlighted.
There are two modes: player vs player or player vs computer.
The computer is always player 2. */

// a self-invoking function, lets be modular:)
!function() {
const startScreen = document.querySelector('#start');
const boardScreen = document.querySelector('#board');
const finishScreen = document.querySelector('#finish');
const pvspButton = document.querySelector('.pvsp'); // player vs player
const pvscButton = document.querySelector('.pvsc'); // player vs computer
const p1 = document.querySelector('#p1'); // span element, player 1 name on screen
const p2 = document.querySelector('#p2'); // span element, player 2 name on screen
const playerName1 = document.querySelector('#playerName1'); // input elements
const playerName2 = document.querySelector('#playerName2'); // input elements
const newGameButton = document.querySelector('#finish .button');
const p = document.querySelector('.message'); 
// paragraph element, to show player name on win screen / 'its a tie'
const player1 = document.querySelector('#player1'); // the svg of player 1
const player2 = document.querySelector('#player2'); // the svg of player 2
const squares = document.querySelectorAll('.box'); //a collection of the 9 board squares
const boardCoordinates = ['00', '01', '02', '10', '11', '12', '20', '21', '22']; // identifies each square on the board
let playerCoordinates = [ [], [], [] ]; 
// holds the value of (1 or 2) for each square selected by player 1 or player 2, respectively.
let player = Math.floor(Math.random() * 2) + 1; 
let tieCounter = 0;
// set coordinates for each square of board
for(i = 0; i < squares.length; i += 1) {
  squares[i].setAttribute('ID', boardCoordinates[i]);
} 
boardScreen.style.display = 'none';
finishScreen.style.display = 'none';
/* This will test for win and tie conditions, and call displayWinner() as needed to set wining screen.
Also, the return statement is used to control the action of the computer player. */
function gameOver() {
  let r1 = 0; let c1 = 0; let d1 = 0;
  let r2 = 0; let c2 = 0; let d2 = 0;
  let r3 = 0; let c3 = 0; 
  for(let i = 0; i < 3; i += 1) {
    if(playerCoordinates[0][i] === player.toString()) {
      r1 += 1;
      if(r1 === 3) {
        displayWinner(player);
        return 'stop';
      }
    }
    if(playerCoordinates[1][i] === player.toString()) {
      r2 += 1;
      if(r2 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[2][i] === player.toString()) {
      r3 += 1;
      if(r3 === 3)  {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[i][0] === player.toString()) {
      c1 += 1;
      if(c1 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[i][1] === player.toString()) {
      c2 += 1;
      if(c2 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[i][2] === player.toString()) {
      c3 += 1;
      if(c3 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[i][i] === player.toString()) {
      d1 += 1;
      if(d1 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(playerCoordinates[i][2 - i] === player.toString()) {
      d2 += 1;
      if(d2 === 3) {
        displayWinner(player);
        return 'stop';
      }
    } 
    if(r1 === 3 || r2 === 3 || r3 === 3 || 
       c1 === 3 || c2 === 3 || c3 === 3 ||
       d1 === 3 || d2 === 3) {
       tieCounter = 0;
    } 
    if(tieCounter === 9) {
      boardScreen.style.display = 'none';
      finishScreen.style.display = '';
      finishScreen.classList.add('screen-win-tie');
      p.innerHTML = 'It`s a Tie';
    }
  } 
}
/* This will test for a win move or a block move for the computer player.
The return statement is used to control when the other parts of the 
computerPlayer() are executed. This is very much the same as the gameOver()
but was necessary to avoid some game play problems. */
function winBlockMove() {
  let r1 = 0; let c1 = 0; let d1 = 0;
  let r2 = 0; let c2 = 0; let d2 = 0;
  let r3 = 0; let c3 = 0; 
  for(let i = 0; i < 3; i += 1) {
    if(playerCoordinates[0][i] === player.toString()) {
      r1 += 1;
      if(r1 === 3) {return 'end';}
    }
    if(playerCoordinates[1][i] === player.toString()) {
      r2 += 1;
      if(r2 === 3) {return 'end';}
    } 
    if(playerCoordinates[2][i] === player.toString()) {
      r3 += 1;
      if(r3 === 3)  {return 'end';}
    } 
    if(playerCoordinates[i][0] === player.toString()) {
      c1 += 1;
      if(c1 === 3) {return 'end';}
    } 
    if(playerCoordinates[i][1] === player.toString()) {
      c2 += 1;
      if(c2 === 3) {return 'end';}
    } 
    if(playerCoordinates[i][2] === player.toString()) {
      c3 += 1;
      if(c3 === 3) {return 'end';}
    } 
    if(playerCoordinates[i][i] === player.toString()) {
      d1 += 1;
      if(d1 === 3) {return 'end';}
    } 
    if(playerCoordinates[i][2 - i] === player.toString()) {
      d2 += 1;
      if(d2 === 3) {return 'end';}
    } 
  } 
}
/* This makes a choice for the computer "win" or "block" or "choose a square".
There are 3 seperate loops. The win loop always runs. The block loop runs only
when the win loop fails to find a wining move. The choose a square loop
only runs when both the win and block loops fail to find a move. */
function computerPlayer() {
  let endWin = '';
  let endBlock = '';
  for(let i = 0; i < boardCoordinates.length; i += 1) {
    // winning move
    // selects a wining move if available
    let id = boardCoordinates[i]; 
    let computer = document.getElementById(id);
    if(computer.classList.item(2) !== 'clicked') {
      computer.classList.add('box-filled-2');
      let square = computer.classList.item(1).charAt(11);
      let temp =computer.getAttribute('ID');
      playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = square;
      endWin = winBlockMove();
      if(endWin === 'end') {
        setTimeout(gameOver, 1000);
        break;
      } else {
        computer.classList.remove('box-filled-2');
        playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = '';
      }
    }
    
  } 
  if(endWin !== 'end') {
    for(let m = 0; m < boardCoordinates.length; m += 1) {
      // blocking move
      // blocks only what would be a wining move by the player
      let id = boardCoordinates[m]; 
      let computer = document.getElementById(id);
      if(computer.classList.item(2) !== 'clicked') {
        computer.classList.add('box-filled-1');
        let square = computer.classList.item(1).charAt(11);
        let temp =computer.getAttribute('ID');
        playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = square;
        player = 1;
        endBlock = winBlockMove();
        if(endBlock === 'end') {
          computer.classList.remove('box-filled-1');
          computer.classList.add('box-filled-2');
          playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = '2';
          computer.classList.add('clicked');
          player2.classList.remove('active');
          player1.classList.add('active');
          p2.style.display = 'none';
          p1.style.display = '';
          tieCounter += 1;
          gameOver();
          player = 1;
          break;
        } else {
          computer.classList.remove('box-filled-1');
          playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = '';
        }
      }
    }
  }
  if(endWin !== 'end' && endBlock !== 'end') {
    for(let t = 0; t < boardCoordinates.length; t += 1) {
      // choose a square
      // first available square is selected
      let id = boardCoordinates[t];
      let computer = document.getElementById(id);
      if(computer.classList.item(2) !== 'clicked') {
        computer.classList.add('box-filled-2');
        let square = computer.classList.item(1).charAt(11);
        let temp =computer.getAttribute('ID');
        playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = square;
        computer.classList.add('clicked');
        player2.classList.remove('active');
        player1.classList.add('active');
        p2.style.display = 'none';
        p1.style.display = '';
        tieCounter += 1;
        setTimeout(gameOver, 1000); 
        player = 1;
        break;
      }  
    }
  }
}
// called from gameOver() to set wining screen
function displayWinner(player) {
  boardScreen.style.display = 'none';
  finishScreen.style.display = '';
  if(player === 1) { 
    finishScreen.classList.add('screen-win-one');
    p.innerHTML = 'Winner ' + p1.innerHTML;
  } else {
      finishScreen.classList.add('screen-win-two');
      p.innerHTML = 'Winner ' + p2.innerHTML;
  }
}
// player vs player
pvspButton.addEventListener('click', () => {
	startScreen.style.display = 'none';
  boardScreen.style.display = '';
  p1.innerHTML = playerName1.value;
  p2.innerHTML = playerName2.value;
  if(player === 1) {
    player1.classList.add('active');
    p1.style.display = '';
    p2.style.display = 'none';
  } else {
      player2.classList.add('active');
      p1.style.display = 'none';
      p2.style.display = '';
  } 
});
// player vs computer
pvscButton.addEventListener('click', () => {
 startScreen.style.display = 'none';
 boardScreen.style.display = '';
 p1.innerHTML = playerName1.value;
 p2.innerHTML = 'computer';
 if(player === 1) {
    player1.classList.add('active');
    p1.style.display = '';
    p2.style.display = 'none';
  } else {
      player2.classList.add('active');
      p1.style.display = 'none';
      p2.style.display = '';
      setTimeout(computerPlayer, 1000);
  } 
});
// resets all, same as clicking refresh
newGameButton.addEventListener('click', (event) => {
  playerCoordinates = [ [], [], [] ];
  finishScreen.style.display = 'none';
  boardScreen.style.display = '';
  tieCounter = 0;
  player1.classList.remove('active');
  player2.classList.remove('active');
  for(let i = 0; i < squares.length; i += 1){
    squares[i].classList.remove('clicked');
    squares[i].classList.remove('box-filled-1');
    squares[i].classList.remove('box-filled-2');
    finishScreen.classList.remove(finishScreen.classList.item(2));
  }
  player = Math.floor(Math.random() * 2) + 1;
  if(player === 1) {
    player1.classList.add('active');
    p1.style.display = '';
    p2.style.display = 'none';
  } else {
      player2.classList.add('active');
      p1.style.display = 'none';
      p2.style.display = '';
      if(p2.innerHTML === 'computer') {setTimeout(computerPlayer, 1000);}
  } 
});
// controls mouse behavior for Player vs Player or Player vs Computer
for(let i = 0; i < squares.length; i += 1) {
  squares[i].addEventListener('mouseenter', (event) => {
    if(player2.classList.item(1) === 'active' && p2.innerHTML === 'computer') {
      // do nothing. prevents mouse interaction when computers turn to play.
    } else {
        if(event.target.classList.item(2) === 'clicked') {
          // do nothing. left here for clarity of logic.
        } else {    
  	       if(player === 1) {event.target.classList.add('box-filled-1');}
  	       if(player === 2) {event.target.classList.add('box-filled-2');}
        }
      }
  }); 
  squares[i].addEventListener('mouseleave', (event) => {
  	if(event.target.classList.item(2) === 'clicked') {
       // do nothing. left here for clarity of logic.
    } else {    
        if(player === 1) {event.target.classList.remove('box-filled-1');}
        if(player === 2) {event.target.classList.remove('box-filled-2');}
    }
  }); 
  squares[i].addEventListener('click', (event) => {
    let square = event.target.classList.item(1).charAt(11);
    let temp = event.target.getAttribute('ID');
    playerCoordinates[temp.charAt(0)] [temp.charAt(1)] = square;
    if(event.target.classList.item(2) !== 'clicked') {
      event.target.classList.add('clicked');
      if(player === 1) {
        player1.classList.remove('active');
        player2.classList.add('active');
        p1.style.display = 'none'
        p2.style.display = '';
        tieCounter += 1;
        let stop = gameOver();
        player = 2;
        if(p2.innerHTML === 'computer' && stop !== 'stop') {setTimeout(computerPlayer, 1000);}
      } else {
          player2.classList.remove('active');
          player1.classList.add('active');
          p1.style.display = ''
          p2.style.display = 'none';
          tieCounter += 1;
          gameOver();
          player = 1;
      }
    }
  }); 
}
}(); // end of self-invoking function





