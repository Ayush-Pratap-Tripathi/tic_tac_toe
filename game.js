let buttons = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");
let newButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg"); 
let gameWon = false;
let turn0 = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const gameDraw = () => {
    msg.innerText = `Game draw!
    No one wins!`;
    msgContainer.classList.remove("hide");
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (turn0) {
            button.innerText = "O";
            turn0 = false;
        } else {
            button.innerText = "X";
            turn0 = true;
        }
        button.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && gameWon === false) {
            gameDraw();
        }
    })
});

const disableBoxes = () => {
    for (let button of buttons) {
        button.disabled = true;
    }
}

const showWinner = (winner) => {
    if (winner === "O") {
        msg.innerText = "Player-1 wins!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    } else if (winner === "X"){
        msg.innerText = "Player-2 wins!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
}

const checkWinner = () => {
    for (patterns of winPatterns) {
        let pos1Val = buttons[patterns[0]].innerText;
        let pos2Val = buttons[patterns[1]].innerText;
        let pos3Val = buttons[patterns[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                gameWon = true;
            }
        }
    }
}

const enableButtons = () => {
    for (let button of buttons) {
        button.disabled = false;
    }
}

const resetGame = () => {
    buttons.forEach((button) => {
        button.innerText = "";
    })
    enableButtons();
    turn0 = true;
    count = 0;
    msgContainer.classList.add("hide");
}

newButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);