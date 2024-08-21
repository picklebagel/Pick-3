document.addEventListener('DOMContentLoaded', () => {
    const shapes = ['■', '▲', '●'];
    const revealedColors = {'■': 'red', '▲': 'blue', '●': 'yellow'};
    const halfToneColors = {'■': '#FFC0CB', '▲': '#ADD8E6', '●': '#FFFFE0'};
    const possibleButtonColors = ['#D8BFD8', '#98FB98', '#FFDAB9'];
    let shapeCount = {'■': 0, '▲': 0, '●': 0};
    let hiddenBoard = [];
    let gameBoard = document.querySelector('.game-board');
    let resultDisplay = document.getElementById('result');
    let restartButton = document.getElementById('restart-button');

    function randomizeBoard() {
        let placedShapes = [];
        while (placedShapes.length < 16) {
            let shape = shapes[Math.floor(Math.random() * shapes.length)];
            placedShapes.push(shape);
        }
        hiddenBoard = placedShapes;
        shapeCount = {'■': 0, '▲': 0, '●': 0};
        resetBoard();
    }

    function resetBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 16; i++) {
            let btn = document.createElement('button');
            btn.style.backgroundColor = possibleButtonColors[Math.floor(Math.random() * possibleButtonColors.length)];
            btn.dataset.index = i;
            btn.innerHTML = '[ ]';
            btn.addEventListener('click', onClick);
            gameBoard.appendChild(btn);
        }
        resultDisplay.innerText = '';
    }

    function checkWin() {
        for (let shape in shapeCount) {
            if (shapeCount[shape] === 3) {
                if (shape === '■') {
                    resultDisplay.innerText = 'You win!';
                } else if (shape === '▲') {
                    resultDisplay.innerText = 'Big win!';
                } else if (shape === '●') {
                    resultDisplay.innerText = 'Mega win!';
                }
                revealRemainingHalfTone();
                disableButtons();
                break;
            }
        }
    }

    function onClick(event) {
        let index = event.target.dataset.index;
        let revealedShape = hiddenBoard[index];
        event.target.innerHTML = revealedShape;
        event.target.style.backgroundColor = revealedColors[revealedShape];
        shapeCount[revealedShape]++;
        checkWin();
    }

    function revealRemainingHalfTone() {
        let buttons = document.querySelectorAll('.game-board button');
        buttons.forEach((button, index) => {
            if (button.innerHTML === '[ ]') {
                let revealedShape = hiddenBoard[index];
                button.innerHTML = revealedShape;
                button.style.backgroundColor = halfToneColors[revealedShape];
            }
        });
    }

    function disableButtons() {
        let buttons = document.querySelectorAll('.game-board button');
        buttons.forEach(button => {
            button.disabled = true;
        });
    }

    restartButton.addEventListener('click', randomizeBoard);
    randomizeBoard();
});
