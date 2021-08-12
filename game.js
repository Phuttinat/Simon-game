var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

var userClickPattern = [];

var level = 0;

var started = false

$(document).keypress(function () {
    if (started = true) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function nextSequence() {
    userClickPattern = [];
    var randomNumber = Math.floor((Math.random() * 4));

    console.log(randomNumber);
    // random number not including the 4.
    var randomChosenColor = buttonColors[randomNumber];

    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    level += 1;
}


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animationPress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animationPress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
        if (gamePattern.length === userClickPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000)

        }
    } else {
        playSound("wrong");

        $("#level-title").html("Gameover, Press any key to restart. <br><em>Level</em></br> " + level).css("line-height", "85px");
        $("p").hide();
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
