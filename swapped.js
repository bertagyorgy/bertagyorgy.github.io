const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");

// Tábla beállításai
const boardSize = 20;
const cellSize = canvas.width / boardSize;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let currentPlayer = "X";
let isGameOver = false;
let lastPlayerMove = null; // Az utolsó játékos lépésének tárolása

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
function checkWin(x, y, player) {
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

// Nyertest ír ki, de a vesztes alapján
function showWinner(loser) {
    isGameOver = true;
    const winnerModal = document.getElementById("winnerModal");
    const winnerText = document.getElementById("winnerText");

    const winner = loser === "X" ? "O" : "X";
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
        lastPlayerMove = { x, y };

        if (checkWin(x, y, currentPlayer)) {
            showWinner(currentPlayer); // Az veszít, aki 5-ös sort hozott létre
        } else {
            currentPlayer = "O";
            makeBotMove();
        }
    }
});

// Bot lépése
function makeBotMove() {
    let bestMove = null;

    // Keresés a játékos utolsó lépése körül
    const { x: px, y: py } = lastPlayerMove;
    for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
            const nx = px + dx;
            const ny = py + dy;

            if (
                nx >= 0 &&
                nx < boardSize &&
                ny >= 0 &&
                ny < boardSize &&
                board[nx][ny] === null
            ) {
                // Teszteljük, hogy létrejön-e egy veszélyes sor
                board[nx][ny] = "O";
                const isDangerous = checkWin(nx, ny, "O");
                board[nx][ny] = null;

                if (!isDangerous) {
                    bestMove = { x: nx, y: ny };
                }
            }

            if (bestMove) break;
        }
        if (bestMove) break;
    }

    // Ha nincs biztonságos lépés, véletlenszerű üres helyre lép
    if (!bestMove) {
        for (let x = 0; x < boardSize; x++) {
            for (let y = 0; y < boardSize; y++) {
                if (board[x][y] === null) {
                    bestMove = { x, y };
                    break;
                }
            }
            if (bestMove) break;
        }
    }

    // Végrehajtja a lépést
    if (bestMove) {
        const { x, y } = bestMove;
        board[x][y] = currentPlayer;
        drawSymbol(x, y, currentPlayer);

        if (checkWin(x, y, currentPlayer)) {
            showWinner(currentPlayer); // Az veszít, aki létrehozta az 5-ös sort
        } else {
            currentPlayer = "X";
        }
    }
}

// Kezdeti tábla kirajzolása
drawBoard();
