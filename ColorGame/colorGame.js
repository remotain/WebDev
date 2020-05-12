// App parameters
var numSquares = 6;
var colors = [];
var pickedColor;
// Selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    // Mode button event listeners
    setupModeButtons();
    // Squares event listeners
    setupSquares();
    // Reset colors
    reset();
}

function setupModeButtons(){
    for(var i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        });
    }
}

function setupSquares(){
    for(var i=0; i<squares.length; i++){
        // Add click listeners to squares
        squares[i].addEventListener("click", function(){
            // Grab color of the clicked square
            var clickedColor = this.style.backgroundColor;
            // Compare color to pickedColor
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                h1.style.backgroundColor = pickedColor;
                changeColors(pickedColor);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            }
        });
    }
}

function reset(){
    // Generate new 'numSquares' random color 
    colors = generateRandomColor(numSquares);
    // Pick a color randomly
    pickedColor = pickColor();
    // Change colorDisplay text content
    colorDisplay.textContent = pickedColor;
    // Reset messageDisplay
    messageDisplay.textContent = "";
    // Change resetButton text
    resetButton.textContent = "New Colors"
    // Change colors of squares
    for(var i=0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    // Reset h1 background color
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
});


function changeColors(color){
    for(var i=0; i<squares.length; i++){
        // Initial color to squares
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var randomIndex =  Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColor(ncolor){
    var arr = [];
    for(var i =0; i<ncolor; i++){
        arr.push(randomColor());
    }
    return arr;
}

function randomColor(){
    // pick 3 numbers between 0 and 255
    var r = Math.floor(Math.random() * 256); 
    var g = Math.floor(Math.random() * 256); 
    var b = Math.floor(Math.random() * 256); 

    return "rgb(" + r + ", " + g + ", " + b + ")";
}