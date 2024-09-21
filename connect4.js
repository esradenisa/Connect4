const ROWS = 6;
const COLS = 7;
let currentPlayer = 1;
let board = [];
let gameOver = false;
const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

function initBoard() {
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    for (let row = 0; row < ROWS; ++row) {
        for (let col = 0; col < COLS; ++col) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
    message.textContent = `Player ${currentPlayer}'s turn (Red)`;
}

function handleCellClick(e) {
    if (gameOver) return;
    const col = parseInt(e.target.dataset.col);
    const row = getAvailableRow(col);
    if (row !== -1) {
        board[row][col] = currentPlayer;
        const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.classList.add(`player${currentPlayer}`);

        if (checkWin(row, col)) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
        } else if (board.every(row => row.every(cell => cell !== 0))) {
            message.textContent = 'It\'s a draw!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            message.textContent = `Player ${currentPlayer}'s turn (${currentPlayer === 1 ? 'Red' : 'Yellow'})`;
        }
    }
}

function getAvailableRow(col) {
    for (let row = ROWS - 1; row >= 0; --row) {
        if (board[row][col] === 0) {
            return row;
        }
    }
    return -1;
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; ++i) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;

        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS && board[newRow][newCol] === currentPlayer) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || checkDirection(row, col, 0, 1) || checkDirection(row, col, 1, 1) || checkDirection(row, col, 1, -1) 
    );
}

initBoard();