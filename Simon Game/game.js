var gameColor = ['red', 'blue', 'yellow', 'green'];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var userChosenColor = '';

$(document).keypress(function()
{
	if(!gameStarted)
	{
		setTimeout(function()
		{
			nextSequence();
		},1000);
		gameStarted = true;
	}
});

$(".btn").click(function()
{
	userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	console.log(userClickedPattern);
	animateButton(userChosenColor);
	checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
	level++;
	$("#level-title").text("Level -"+level);
	userClickedPattern = [];
	var randomColor = gameColor[Math.floor(Math.random() * 4)];
	gamePattern.push(randomColor);
	console.log(gamePattern);
	playSound(randomColor);
	$("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color)
{
	var aud = new Audio ("sounds/"+color+".mp3");
	aud.play();
}

function animateButton(color)
{
	$("#"+color).addClass("pressed");
	setTimeout(function()
	{
		$("#"+color).removeClass("pressed");
	},100);
}

function checkAnswer(currentlevel)
{
	if(gamePattern[currentlevel] === userClickedPattern[currentlevel])
	{
		if(gamePattern.length === userClickedPattern.length)
		{
			setTimeout(function()
			{
				nextSequence();
			},1000);
		}
	}
	else
	{
		$("body").addClass("game-over");
		var wro = new Audio ("sounds/wrong.mp3");
		wro.play();
		$("#level-title").text("Game Over!!! Press Any key to Restart");
		setTimeout(function()
		{
			$("body").removeClass("game-over");
		},200);
		startOver();
		gameStarted = false;
	}
}

function startOver()
{
	level = 0;
	userClickedPattern = [];
	gamePattern = [];
}