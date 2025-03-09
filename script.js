let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnDisplay = document.querySelector("#turn-display");
let scoreXDisplay = document.querySelector("#score-x");
let scoreODisplay = document.querySelector("#score-o");

let turnO = true; // Player X (false) or Player O (true)
let scoreX = 0;
let scoreO = 0;
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnDisplay();
};

const playClickSound = () => {
    let audio = new Audio("click.mp3"); // Add a click sound file
    audio.play();
};

const updateTurnDisplay = () => {
    turnDisplay.innerText = `Turn: ${turnO ? "O" : "X"}`;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        playClickSound();
        if (turnO) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turnO = !turnO;
        box.disabled = true;
        updateTurnDisplay();
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "X") {
        scoreX++;
    } else {
        scoreO++;
    }
    updateScoreboard();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1Val = boxes[a].innerText;
        let pos2Val = boxes[b].innerText;
        let pos3Val = boxes[c].innerText;

        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return;
        }
    }
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a Draw! 🤝";
        msgContainer.classList.remove("hide");
    }
};

const updateScoreboard = () => {
    scoreXDisplay.innerText = `X Wins: ${scoreX}`;
    scoreODisplay.innerText = `O Wins: ${scoreO}`;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    updateScoreboard();
    resetGame();
});

updateTurnDisplay();
updateScoreboard();
