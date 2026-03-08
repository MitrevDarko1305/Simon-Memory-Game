var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var started = false; // makes the game start once keyword is pressed //
var level = 0;
var isPlaying = false;
var sequenceSpeed = 600; //Speed variable // 


var playSequence = function(index){

    if(index >= gamePattern.length){
        isPlaying = false;
        return;
    }

    var color = gamePattern[index];

    $("#" + color).addClass("active");
    playSound(color);

    setTimeout(function(){
        $("#" + color).removeClass("active");
    }, sequenceSpeed / 2);

    setTimeout(function(){
        playSequence(index + 1);
    }, sequenceSpeed);
}

// Function To Start The Game On Mobile and Desktop //
var startGame = function(){
    if(!started){
        nextSequence();
        started = true;
    }
}

//Starting Game For Desktop //
$(document).keypress (function(){
startGame();
})

// Start Button For Mobile //
$("#level-title").click(function(){
startGame();
});


var playSound = function(name) {
    var audio = new Audio("sounds/" + name + ".mp3"); // it connects it to the sounds. 
    audio.play(); // plays the sound in nextsequence 
}

var nextSequence = function() {
   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColor = buttonColors[randomNumber];
   userClickedPattern = []; // Resets the user pattern for new game //
   isPlaying = true;

   level++;
   $("#level-title").text("Level "  + level + " ⚡" ); // changes the h1 text once the game starts. //

   if(level % 3 === 0 && sequenceSpeed > 200){
    sequenceSpeed -=120;
   }

   gamePattern.push(randomChosenColor);

   $(".btn").stop(true,true).show();

   playSequence(0);

   /*
   // Loop through the entire game pattern //
    gamePattern.forEach(function(color, i){
        setTimeout(function(){
            $("#" + color).stop(true,true).fadeOut(200).fadeIn(200);
            playSound(color);
        },sequenceSpeed * i);
    })
    setTimeout(function(){
        isPlaying = false;
    }, sequenceSpeed * gamePattern.length + 300);

   console.log(randomChosenColor);
}
 */

}

// JQuery Event Listener
$(".btn").click(function() {

if(!started){
    startGame();
    return; // User taps on any button and restarts the game //
}

if(isPlaying) return; // block input during sequence playback

var userChosenColor = $(this).attr("id"); // gets the ID of the button the user clicked, and stores it in variable.

userClickedPattern.push(userChosenColor);

playSound(userChosenColor); // plays the sound of the user clicked button //

animatePress(userChosenColor);

checkAnswer(userClickedPattern.length-1);

console.log(userClickedPattern);

});

var animatePress = function(currentColor) {
    $("#" + currentColor).addClass("pressed");

    // Function setTimeOut, that removes the class pressed after 100milliseconds//
    setTimeout (function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Check Answer // 
var checkAnswer = function(currentLevel){
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {
        console.log("Success");

    if (userClickedPattern.length === gamePattern.length){
        setTimeout(function (){
            nextSequence();
        }, 1000);
    }
    } else {
        console.log("wrong");
        playSound("wrong"); 
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 3000);
        $("#level-title").text("You Lost The Game, Press Any Key To Restart");

        startOver();
}
}

/* Start Over Function */
var startOver = function(){
    level = 0;
    gamePattern = [];
    started = false;
    $("#level-title").show();
    sequenceSpeed = 600;
}


