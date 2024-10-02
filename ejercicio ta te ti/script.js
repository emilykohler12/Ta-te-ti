const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');

let currentPlayer = 'X';
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameBoard[cellIndex] !== "" || !isGameActive) {
        return;
    }

    updateCell(event.target, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === "" || gameBoard[b] === "" || gameBoard[c] === "") {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `¡El jugador ${currentPlayer} ha ganado!`;
        isGameActive = false;
        return;
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "¡Es un empate!";
        isGameActive = false;
        return;
    }

    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Es el turno de ${currentPlayer}`;
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    statusText.textContent = `Es el turno de ${currentPlayer}`;
    cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
