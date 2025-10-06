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

    const dropValue = (row, column, player) => {
        const cell = board[row][column];
        if (cell.getValue() === 0) {
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
    let value = 0;
    const addValue = (player) => {
        value = player;
    };
    const getValue = () => value;

    return { getValue, addValue };
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
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    };

    const playRound = (row, column) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into (${row}, ${column})`);
        board.dropValue(row, column, getActivePlayer().token);
        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();

    return { playRound, getActivePlayer };
}

const game = GameController();
