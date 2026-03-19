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

  return { getBoard };
}

function Cell() {
  let value = "";
  let color = "";
  const addValue = (player) => {
    value = player;
  };
  const getValue = () => value;
  const addColor = (player) => {
    color = player;
  };
  const getColor = () => color;

  return { getValue, addValue, getColor, addColor };
}

function Screen(board, getActivePlayer, switchPlayerTurn, checkWinnerCallback) {
  const createDiv = () => {
    const GameD = document.querySelector(".gameboard");
    GameD.innerHTML = ""; // Clear board on each new round
    const message = document.querySelector("#playersTurn");
    //const players = ["PlayerOne", "PlayerTwo"];

    let divClick = true;
    board.getBoard().forEach((row, rowindex) => {
      row.forEach((cell, cellindex) => {
        let div = document.createElement("div");
        let playerText = document.createElement("h2");
        div.appendChild(playerText);
        div.style.backgroundColor = "black";
        div.setAttribute("class", "cell");
        playerText.textContent = cell.getValue();
        playerText.style.color = cell.getColor();

        div.style.width = "120px";
        div.style.height = "120px";
        div.style.border = "1px solid white";
        div.style.fontSize = "3rem";

        //div.style.lineHeight = '100px';

        div.addEventListener("click", () => {
          if (divClick) {
            if (cell.getValue() === "" && cell.getColor() === "") {
              cell.addValue(getActivePlayer().token);
              cell.addColor(getActivePlayer().color);
              playerText.style.color = getActivePlayer().color;
              playerText.textContent = getActivePlayer().token;

              if (checkWinnerCallback() && divClick) {
                message.textContent = `${getActivePlayer().name} wins! this round✅`;
                divClick = false;
                console.log(divClick);
              } else {
                switchPlayerTurn();
                message.textContent = `${getActivePlayer().name}'s turn`;
              }
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
    { name: "PlayerOne", token: "X", color: "Red" },
    { name: "PlayerTwo", token: "O", color: "Blue" },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    //updateScreen.createDiv();
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
      [b[0][2], b[1][1], b[2][0]],
    ];

    return lines.some((line) => {
      const [a, b, c] = line;
      return (
        a.getValue() !== "" &&
        a.getValue() === b.getValue() &&
        a.getValue() === c.getValue()
      );
    });
  };

  const updateScreen = Screen(
    board,
    getActivePlayer,
    switchPlayerTurn,
    checkWinner,
  );

  updateScreen.createDiv(); // Start the game

  return {};
}

GameController();

const restart = document.querySelector("#restart");
restart.addEventListener("click", () => {
  window.location.reload();
});
