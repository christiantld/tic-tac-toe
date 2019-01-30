//variables
let origBoard;
let playTime = 1;
const playerX = 'X';
const playerO = 'O';
let winCombos = [ 
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6] 
];
const cell = document.querySelectorAll('.cell');

//inicializa o jogo
startGame();

//functions

// zera o tabuleiro para um novo jogo
function startGame() {
  document.getElementById('board').style.marginTop = '27px';
  origBoard = Array.from(Array(9).keys());
  for (i = 0; i < cell.length; i++) {
    cell[i].innerText = '';
    cell[i].addEventListener('click', turnClick, false);
    cell[i].style.removeProperty('background-color');
    document.getElementById('mostrador').innerText = '';
    playTime = 1;
  }
}

// define a acao ao clicar em cada quadrado
function turnClick (square){
  turn(square.target.id);
  
}

/* define o comportamento padrao de cada clique
zera a margen do tabuleiro, mostra o turno
marca a  quadrado e o array do tabuleiro, passa a vez
e verifica se houve algum vencedor */
function turn(squareId, player) {
  document.getElementById('board').style.marginTop = '0';
  if (playTime == 1) {
    player = playerO
    document.getElementById('mostrador').innerText = 'Vez de X';
    document.getElementById(squareId).innerText = playerO;
    document.getElementById(squareId).style.color = '#f7e8d4';
    origBoard[squareId] = playerO;
    cell[squareId].removeEventListener('click', turnClick, false);
    playTime = 2
  } else {
    player = playerX
    document.getElementById('mostrador').innerText = 'Vez de O';
    document.getElementById(squareId).innerText = playerX;
    document.getElementById(squareId).style.color = '#333333';
    origBoard[squareId] = playerX;
    cell[squareId].removeEventListener('click', turnClick, false);
    playTime = 1
  }
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon); 
}

//cria um array com as jogadas e compara com as formas de vitoria
function checkWin(board, player) {
	let plays = board.reduce((a, e, i) => //accumulator, element, index
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) { // se existir o elemento
      gameWon = {index: index, player: player};
      checkTie();
			break;
		}
  }
  checkTie() == false;
  return gameWon;
}

//mostra os quadrados vencedores e remove os cliques
function gameOver(gameWon) {
  if (gameWon.player == playerX  || playerO) {
	  for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor = "#ffffff62";
    }
  }
	for (var i = 0; i < cell.length; i++) {
		cell[i].removeEventListener('click', turnClick, false);
  }
	declareWinner(gameWon.player == playerX ? "X ganhou!" : "O ganhou!");
}

//mostra a mensagem  de quem venceu
function declareWinner(winner) {
  document.getElementById('mostrador').innerText  = winner;
}

//checa se uma celula esta preenchida
function filledCell (element, index, array) {
  return typeof element === 'string'
}

// se todas as celulas estiverem preenchidas declara empate
function checkTie(){
  if (origBoard.every(filledCell)) {
    declareWinner("Deu Velha!")
    return true
  }
  return false;
}
