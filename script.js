function GameBoard() {
    let rows = 3;
    let columns = 3;
    let board = [];

    // Create new Cell for each position
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const dropValue = (row, column , player) => {
        let cell = board[row][column]
        if (board.getValue() === '') {
            cell.addValue(player);
        } else {
            console.log("Cell already taken!");
        }
    };

    const printBoard = () => {
        const boardWithValues = board.map(row =>
            row.map(cell => cell.getValue())
        );
        console.log(boardWithValues);
    };

    return { getBoard, dropValue, printBoard };
}


function Cell() {
    let value = '';
    const addValue = (player) => {
        value = player;
    };
    const getValue = () => value;

    return { getValue, addValue };
}

function Screen(board, getActivePlayer, switchPlayerTurn, checkWinnerCallback) {
    const createDiv = () => {
        const GameD = document.querySelector('.gameboard');
        GameD.innerHTML = ''; // Clear board on each new round
        const message = document.querySelector('#playersTurn');

        board.getBoard().forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                let div = document.createElement('div');
                div.style.backgroundColor = 'black';
                div.textContent = cell.getValue(); // shows current value
                div.setAttribute('class', 'cell');
                div.style.width = '60px';
                div.style.height = '60px';
                div.style.border = '1px solid white';
                div.style.fontSize = '2rem';
                //div.style.lineHeight = '100px';

                div.addEventListener('click', () => {
                    if (cell.getValue() === '') {
                        cell.addValue(getActivePlayer().token);
                        div.textContent = getActivePlayer().token;

                        if (checkWinnerCallback()) {
                            message.textContent = `${getActivePlayer().name} wins!`
                        } else {
                            switchPlayerTurn();
                            message.textContent = `${getActivePlayer().name}'s turn`
                        }
                    }
                });

                GameD.appendChild(div);
            });
        });
    };

    return { createDiv };
}

function GameController() {
    const board = GameBoard();
    const players = [
        { name: 'PlayerOne', token: 'X' },
        { name: 'PlayerTwo', token: 'O' }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        updateScreen.createDiv();
    };

    const getActivePlayer = () => activePlayer;

    const checkWinner = () => {
        const b = board.getBoard();
        const lines = [
            [b[0][0], b[0][1], b[0][2]],
            [b[1][0], b[1][1], b[1][2]],
            [b[2][0], b[2][1], b[2][2]],
            [b[0][0], b[1][0], b[2][0]],
            [b[0][1], b[1][1], b[2][1]],
            [b[0][2], b[1][2], b[2][2]],
            [b[0][0], b[1][1], b[2][2]],
            [b[0][2], b[1][1], b[2][0]]
        ];

        return lines.some(line => {
            const [a, b, c] = line;
            return a.getValue() !== '' && a.getValue() === b.getValue() && a.getValue() === c.getValue();
        });
    };

    const updateScreen = Screen(board, getActivePlayer, switchPlayerTurn, checkWinner);

    updateScreen.createDiv(); // Start the game

    return {};
}

GameController();

    


