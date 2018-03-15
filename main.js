console.log('hello');
const board = document.querySelector('#board');
//console.log(board);
board.style.display = 'none';
const button = document.querySelector('.button');
//console.log(button);
const start = document.querySelector('#start');
//console.log(start);
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const player = Math.floor(Math.random() * 2) + 1;
//console.log(player);
button.addEventListener('click', () => {
	board.style.display = '';
	start.style.display = 'none';
	if(player === 1) {
	  player1.classList.add('active');
	} else {
	    player2.classList.add('active');
	} // working as expected
});
const squares = document.querySelectorAll('.box');
//console.log(squares);
for(i = 0; i < squares.length; i += 1) {
  squares[i].addEventListener('mouseenter', (event) => {
  	if(player === 1) {
  	  event.target.classList.add('box-filled-1');
  	} else {
  	    event.target.classList.add('box-filled-2');
  	}
  }); // works as expected
  squares[i].addEventListener('mouseleave', (event) => {
  	if(player === 1) {
  	  event.target.classList.remove('box-filled-1');
  	} else {
  	    event.target.classList.remove('box-filled-2');
  	}
  },); // works as expected
  squares[i].addEventListener('click', (event) => {
    console.log('hello'); // just check listener was added
    // removeEventListener does not work
  	event.target.removeEventListener('mouseleave', (event) => {});
  });
}




