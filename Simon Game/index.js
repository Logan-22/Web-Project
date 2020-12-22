var buttonColors = [  "red" , "blue" ,"green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var seq = 0;
var start = 0;
var game  = 1;

function nextSequence()
{	
	level++;
	userClickedPattern = [];
	seq = 0;
	$("#level-title").text("Level "+level)
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	console.log("gamePattern->" + gamePattern);
	switch(randomChosenColor)
	{
		case "red": 
		$("#red").fadeOut(100).fadeIn(100);
		var red_aud = new Audio("sounds/red.mp3");
		red_aud.play();
		break;

		case "green": 
		$("#green").fadeOut(100).fadeIn(100);
		var gre_aud = new Audio("sounds/green.mp3");
		gre_aud.play();
		break;

		case "yellow": 
		$("#yellow").fadeOut(100).fadeIn(100);
		var yel_aud = new Audio("sounds/yellow.mp3");
		yel_aud.play();
		break;

		case "blue": 
		$("#blue").fadeOut(100).fadeIn(100);
		var blu_aud = new Audio("sounds/blue.mp3");
		blu_aud.play();
		break;

		default: 
		console.log(gamePattern[i]);
		break;
	}
}

$(document).keydown(function(event){
	if(event.key === 's')
	{
		nextSequence();
		$(document).off("keydown");
	}
});

$(".btn").click(function(event){
	if(game === 1)
	{
		var userChosenColor = event.target.id;
		userClickedPattern.push(userChosenColor);
		console.log("userClickedPattern->" + userClickedPattern);
		playSound(userChosenColor);
		animatePress(userChosenColor);
		console.log(seq);
		checkAnswer(seq)
		seq = seq + 1;
	}
});

function playSound(userChosenColor)
{
	switch(userChosenColor)
	{
		case "red": 
		var red_aud = new Audio("sounds/red.mp3");
		red_aud.play();
		break;

		case "green": 
		var red_aud = new Audio("sounds/green.mp3");
		red_aud.play();
		break;

		case "yellow": 
		var red_aud = new Audio("sounds/yellow.mp3");
		red_aud.play();
		break;

		case "blue": 
		var red_aud = new Audio("sounds/blue.mp3");
		red_aud.play();
		break;

		default: 
		console.log(userChosenColor);
		break;
	}
}

function animatePress(userChosenColor)
{
	$("#" + userChosenColor).addClass("pressed");
	setTimeout(function(){$("#" + userChosenColor).removeClass("pressed");},100);
}

function checkAnswer(currentLevel)
{	
	console.log("gamePattern[currentLevel]-> "+gamePattern[currentLevel]+" userClickedPattern[currentLevel]-> "+userClickedPattern[currentLevel]);
	if (gamePattern[currentLevel] != userClickedPattern[currentLevel])
	{
		game = 0;
		console.log("GAME OVER");
		var wro_aud = new Audio("sounds/wrong.mp3");
		wro_aud.play();
		
		$("h1").text('Game Over , press "R" Key to Restart');
		$("body").addClass("game-over");
		setTimeout(function(){$("body").removeClass("game-over"),200;})
		$(document).keydown(function(event)
			{
				if(event.key==='r')
				{
					startOver();
					$(document).off("keydown");
				}
			});
	}
	else if (currentLevel+1 === level)
	{
		console.log("Success");
		setTimeout(nextSequence,1000);
	}
}

function startOver()
{	
	game = 1;
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
	seq = 0;
	setTimeout(nextSequence,1000);
}