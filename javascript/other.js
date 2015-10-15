/*
Title: A Dynamic Quiz
Name: Catherine Kerner
Date: 10/9/15 (extended)
Notes: Pie chart adapted from http://wickedlysmart.com/how-to-make-a-pie-chart-with-html5s-canvas/

*/

var content = document.getElementById('content');
var buttons = document.getElementById('buttons');
var i =0;
var correct = 0;
var incorrect = 0;
var first = true;
var nameString;
var checkedVal = {};
var colors = ["Green", "Red"];
var lastCalled = false;

content.innerHTML = "<p>Welcome to my Literature Quiz! Please enter your name below to begin</p>";
content.innerHTML += "Name:<br>" +"<input type='text' id = 'fName' name='userid'><br>'";

$( ".buttons" ).append("<button type='button' id='toLastQuestion' class = 'toLastQuestion'>Back</button>");
$( ".buttons" ).append("<button type='button' id='toNextQuestion' class='toNextQuestion'>Next</button>");
$( ".buttons" ).append("<button type='button' id='submit' class='submit'>Submit</button>");
$( ".toLastQuestion" ).hide();
$( ".submit" ).hide();

  

function nextQuestion(){
$( "#content" ).hide();	
$( "#content" ).fadeIn( "slow");
if(i===0 || atLeastOneRadio()==true){	
	if(lastCalled===false){
checkedVal[i-1] = $("#radios input[type='radio']:checked").val();////PROBLEM!!!!
}
$( ".toLastQuestion" ).hide();
$( ".submit" ).hide();
if(i>=1){
	$( ".toLastQuestion" ).show();
	//console.log('button made');
}	


		//console.log($("#radios input[type='radio']:checked").val());
	 if(i===0){
	 	if(first===true){
		var firstName = document.getElementById('fName'); 
        nameString =  firstName.value;  
		}                                        
		content.innerHTML = "<p><b>Welcome " +nameString + "!</b> Here's your first question...</p>";
		content.innerHTML += "<p>Question #1:</p>";
	}
	else{
		content.innerHTML = " ";
		content.innerHTML = "Question #" + (i+1) + ":";
	}
	///////////////////////////////////////////////////////////////////////////////
																					//questions
	 if(i<quiz.questions.length){

	 content.innerHTML += "<p>" + quiz.questions[i].texts + "</p>";

 
		//}//loop


	 $( ".content" ).append( "<div id='radios' class = 'radios'></div>" );
	 for(var j= 0; j<((quiz.questions[i].answers).length); j++){
	 	if (checkedVal[i] === quiz.questions[i].answers[j]){
	 		$( ".radios" ).append("<input type='radio' checked='checked' name='choice' value='" + quiz.questions[i].answers[j] + "'> "+ quiz.questions[i].answers[j]+"<br>");
	 	}
	 	else {
	 		$( ".radios" ).append("<input type='radio' name='choice' value='" + quiz.questions[i].answers[j] + "'> "+ quiz.questions[i].answers[j]+"<br>");
	 }
	 }

	  }//answer buttons
	for(k=0;k<quiz.questions.length; k++){
		console.log(checkedVal[k]);
	}

/*if(checkedVal[i]){ 
	$("#choice:input[value='"+ checkedVal[i] + "']").prop('checked', true);
	console.log('checkedVal +' + checkedVal[i]);
		}*/


	////////////////////////////////////////////////////////////////////////////////	
	if(i=== (quiz.questions.length)-1){															//buttons
		$( ".submit" ).show();
		$( ".toNextQuestion" ).hide();
		}
	
	i++;
	lastCalled = false;
	first=false;
	}//atleastoneradio
else{
	alert("Please select an answer before moving forward");
}

}//nextquestion

function lastQuestion(){
	lastCalled = true;
	if(atLeastOneRadio()===true){
	i-=2;
	nextQuestion();
	}
	else{
	alert("Please select an answer before going back");}
}

function atLeastOneRadio() {
    return ($('input[type=radio]:checked').size() > 0);

}

function end(){
$( ".toNextQuestion" ).hide();
$( ".toLastQuestion" ).hide();
$( ".submit" ).hide();	
	for(i=0; i<quiz.questions.length; i++){
		if(checkedVal[i]==quiz.questions[i].answers[quiz.questions[i].correctAnswer]){
			correct++;
		}
		else{
			incorrect++;
		}
	}
	content.innerHTML = "Congratualtions, " + nameString + "!. You've finnished the quiz."
	$( ".content" ).append("<p><b>Your Score:</b></p>");
	$( ".content" ).append("Percentage:" + correct/(quiz.questions.length)*100 +"%<br>");
	$( ".content" ).append("Correct:" + correct +"<br>");
	$( ".content" ).append("Incorrect:" + incorrect+"<br>");
	$( ".content" ).append("<p></p>");

    $( ".content" ).append("<canvas id='myCanvas' width='200' height='200' style='order:1px solid #000000;'></canvas>");

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    drawSegment(c,ctx,0);
    drawSegment(c,ctx,1);

     $( ".content" ).append("<p>Here are the answers to the questions you missed:</p>");
    for(k=0; k<quiz.questions.length;k++){
    	if(checkedVal[k]!=quiz.questions[k].answers[quiz.questions[k].correctAnswer]){
    		$( ".content" ).append("<p><b>" + quiz.questions[k].texts + "</b></p>");
    		$( ".content" ).append("<p>" + quiz.questions[k].answers[quiz.questions[k].correctAnswer] + "</p>");
    	}
    }
}

function drawSegment(canvas, context, i) {
    context.save();
    var data = [correct/(quiz.questions.length)*360, incorrect/(quiz.questions.length)*360]
    var centerX = Math.floor(canvas.width / 2);
    var centerY = Math.floor(canvas.height / 2);
    radius = Math.floor(canvas.width / 2);

    var startingAngle = degreesToRadians(sumTo(data, i));
    var arcSize = degreesToRadians(data[i]);
    var endingAngle = startingAngle + arcSize;

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, 
                startingAngle, endingAngle, false);
    context.closePath();

    context.fillStyle = colors[i];
    context.fill();

    context.restore();
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI)/180;
}
function sumTo(a, i) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += a[j];
    }
    return sum;
}
var el = document.getElementById("toNextQuestion");
el.addEventListener('click', nextQuestion, false);

var back = document.getElementById("toLastQuestion");
back.addEventListener('click', lastQuestion, false);

var lastOne = document.getElementById("submit");
lastOne.addEventListener('click', end, false);





