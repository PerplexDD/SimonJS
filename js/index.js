// Set up variables needed for the game
const buttonColors = ["green", "yellow", "red", "blue"];
let gamePattern = [];
let userClickPattern = [];
let firstTime = true;
let level = 0;

// Listens for keydown press events to start the game - any key will work
$(document).on("keydown", function () {
  if (firstTime) {
    nextSequence();
    firstTime = false;
  }
});

$(".start-button").on("click", function() {
  if (firstTime) {
    nextSequence();
    firstTime = false;
    $(".start-button").hide();
  }
})

// Listens for click events on the given button to allow proper response
$(".btn").click(function(){

  let userChooseColor = $(this).attr("id");
  userClickPattern.push(userChooseColor);

  animatePress(userChooseColor);
  playSound(userChooseColor);

  checkAnswer(userClickPattern.length-1);
});

// Keeps the game going choosing new random generated colors
function nextSequence() {

  userClickPattern = [];
  let ranNum = Math.floor(Math.random() * 4);
  let ranChosenColor = buttonColors[ranNum];
  gamePattern.push(ranChosenColor);

  $("#" + ranChosenColor).fadeIn(125).fadeOut(125).fadeIn(125);
  playSound(ranChosenColor);
  level++;
  $("#level-title").text("Level " + level);
  console.log(gamePattern);
};


// Plays the correct sound for correct button
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play()
};

// Gives user feedback with animation to button
function animatePress(curColor){
    $("#"+curColor).addClass("pressed");
    setTimeout(function (){
      $("#"+curColor).removeClass("pressed");
    }, 100);
};

// Checks users answers against the computers pattern
function checkAnswer(curLevel) {
  console.log(userClickPattern[curLevel]);
  console.log(gamePattern[curLevel]);
  if(userClickPattern[curLevel] === gamePattern[curLevel]) {
    if (userClickPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $(".start-button").show();
    $("#level-title").text("Game Over, Press Any Key to Restart.")
    startOver();
  }
};

function startOver() {
  gamePattern = [];
  level = 0;
  firstTime = true;
};
