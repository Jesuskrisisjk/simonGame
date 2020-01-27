var started = false;
var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

// Any key to start code

$("h1").click(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    level--;
    nextSequence();
    started = true;
  }

});

// Sequencing Code

function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(250).fadeIn(250);

  playSound(randomChosenColor);


};

// Button Click

$(".btn").click(function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});

// Sound Code

function playSound(name) {

  var audio = new Audio("sounds/" + name + '.mp3');
  audio.play();

};

// Button animation code

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

};


// Answer checking code

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    console.log("Wrong!");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart " + "Your Level Was " + level );
    startOver();
  }

};

// Start Over code

function startOver() {

  level = 0;
  started = false;
  gamePattern = [];

};
