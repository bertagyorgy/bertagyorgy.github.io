const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
//KÖNNYŰ
const boardSize = 20;
const cellSize = canvas.width / boardSize;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let currentPlayer = "X";
let isGameOver = false;
let lastPlayerMove = null; // Az utolsó játékoslépés tárolása

// Tábla kirajzolása
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ff6600";
    ctx.lineWidth = 1;
    for (let i = 0; i <= boardSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

// Szimbólum kirajzolása (X vagy O)
function drawSymbol(x, y, player) {
    const centerX = x * cellSize + cellSize / 2;
    const centerY = y * cellSize + cellSize / 2;
    const radius = cellSize / 3;

    ctx.lineWidth = 4;
    if (player === "X") {
        ctx.strokeStyle = "#ff0000"; // Piros X
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY - radius);
        ctx.lineTo(centerX + radius, centerY + radius);
        ctx.moveTo(centerX + radius, centerY - radius);
        ctx.lineTo(centerX - radius, centerY + radius);
        ctx.stroke();
    } else {
        ctx.strokeStyle = "#0000ff"; // Kék O
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

// Győzelem ellenőrzése
function checkWin(x, y) {
    const player = board[x][y];
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 }
    ];

    for (const { dx, dy } of directions) {
        let count = 1;

        for (let step = 1; step < 5; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        for (let step = 1; step < 5; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        if (count >= 5) {
            return true;
        }
    }
    return false;
}

// Győztes megjelenítése és tábla zárolása
function showWinner(winner) {
    isGameOver = true;
    const winnerModal = document.getElementById("winnerModal");
    const winnerText = document.getElementById("winnerText");
    winnerText.innerText = `A nyertes: ${winner}`;
    winnerModal.style.display = "block";
}

// Játék újraindítása
function restartGame() {
    isGameOver = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
    document.getElementById("winnerModal").style.display = "none";
    currentPlayer = "X";
    drawBoard();
}

// Játékos lépése
canvas.addEventListener("click", (e) => {
    if (isGameOver) return;

    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);

    if (board[x][y] === null) {
        board[x][y] = currentPlayer;
        drawSymbol(x, y, currentPlayer);
        lastPlayerMove = { x, y }; // Utolsó játékos lépésének mentése

        if (checkWin(x, y)) {
            showWinner(currentPlayer);
        } else {
            currentPlayer = "O";
            makeBotMove();
        }
    }
});

// Sorozathossz ellenőrzése adott játékos számára egy adott pozícióban és irányban
function checkSequence(x, y, player, length) {
    const directions = [
        { dx: 1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 1, dy: 1 },
        { dx: 1, dy: -1 }
    ];

    for (const { dx, dy } of directions) {
        let count = 1;

        for (let step = 1; step < length; step++) {
            const nx = x + step * dx;
            const ny = y + step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        for (let step = 1; step < length; step++) {
            const nx = x - step * dx;
            const ny = y - step * dy;
            if (nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize && board[nx][ny] === player) {
                count++;
            } else {
                break;
            }
        }

        if (count >= length) {
            return true;
        }
    }
    return false;
}

// Bot lépése
function makeBotMove() {
    const { x, y } = lastPlayerMove;
    let bestMove = null;

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && ny >= 0 && nx < boardSize && ny < boardSize && board[nx][ny] === null) {
                if (checkSequence(nx, ny, "X", 4)) {
                    bestMove = { x: nx, y: ny };
                    break;
                } else if (checkSequence(nx, ny, "X", 3)) {
                    bestMove = { x: nx, y: ny };
                }
            }
        }
    }

    if (!bestMove) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && ny >= 0 && nx < boardSize && ny < boardSize && board[nx][ny] === null) {
                    bestMove = { x: nx, y: ny };
                    break;
                }
            }
        }
    }

    if (bestMove) {
        const { x, y } = bestMove;
        board[x][y] = currentPlayer;
        drawSymbol(x, y, currentPlayer);

        if (checkWin(x, y)) {
            showWinner(currentPlayer);
        } else {
            currentPlayer = "X";
        }
    }
}

// Kezdeti tábla kirajzolása
drawBoard();
