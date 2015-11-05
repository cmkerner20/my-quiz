/*
Title: A Dynamic Quiz
Name: Catherine Kerner
Date: 10/9/15 (extended)
Notes: Pie chart adapted from http://wickedlysmart.com/how-to-make-a-pie-chart-with-html5s-canvas/

*/


var xhr = new XMLHttpRequest(); 
var content = document.getElementById('content');
var buttons = document.getElementById('buttons');
var i =0;
var correct = 0;
var incorrect = 0;
var first = true;
var last = false;
var nameString;
var checkedVal = {};
var colors = ["Green", "Red"];
var lastCalled = false;
var quiz;

	$.ajax({
		beforeSend: function(xhr){
			if(xhr.overrideMimeType){
				xhr.overrideMimeType("my-quiz/json");
			}
		}
	});

function loadQuiz(){
    console.log('loadQuiz called');

	$.getJSON('/quiz')
	.done(function(data){

     quiz=data;
     if(last===false){
     nextQuestion();
 }
	})//.done
	.fail(function(){
		$('.content').append("Sorry we cannot load the page");
	})//fail
	.always(function(){
     //$('.content').append("always was called");
	})
	
/*	$.ajax({
  dataType: "json",
  url: '/quiz',
  data: data
});
*/
}//load quiz

/*xhr.onload = function(){
	if(xhr.status===200){
		quiz = JSON.parse(xhr.responseText); ///p g397-399
		console.log(quiz);

	}
}*/

content.innerHTML = "<p>Welcome to my Literature Quiz! Please enter your name below to begin</p>";
content.innerHTML += "Name:<br>" +"<input type='text' id = 'fName' name='userid'><br>'";

$( ".buttons" ).append("<button type='button' id='toLastQuestion' class = 'toLastQuestion'>Back</button>");
$( ".buttons" ).append("<button type='button' id='toNextQuestion' class='toNextQuestion'>Next</button>");
$( ".buttons" ).append("<button type='button' id='submit' class='submit'>Submit</button>");
$( ".toLastQuestion" ).hide();
$( ".submit" ).hide();

  

function nextQuestion(){
images.innerHTML = "";
console.log("i=" + i);	
$( "#content" ).hide();	
$( "#content" ).fadeIn( "slow");
if(i===0 || atLeastOneRadio()==true){	
	if(lastCalled===false){
checkedVal[i-1] = $("#radios input[type='radio']:checked").val();////PROBLEM!!!!
}
/////////new
if(i===quiz.questions.length){
	last  = true;
    end();
}
if(last===false){
/////////////////////////////
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
//Object.keys(quiz).length quiz.questions.length
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
///////////////////////////////////////////////////////////////////////////////////////////////////////load picture
	  $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
    tags: String(quiz.questions[i].meta_tags),
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.items, function(l,item){
      $("<img />").attr("src", item.media.m).appendTo("#images");
      if ( l == 0 ) return false;
    });
  });
/////////////////////////////////////////////////////////////////////////////////////////////	  
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
}///new
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
checkedVal[i-1] = $("#radios input[type='radio']:checked").val();
last=true;
$( ".toNextQuestion" ).hide();
$( ".toLastQuestion" ).hide();
$( ".submit" ).hide();	
	for(i=0; i<quiz.questions.length; i++){
		if(checkedVal[i]==quiz.questions[i].answers[quiz.questions[i].correct_answer]){
			correct++;
			quiz.questions[i].global_correct++;
		}
		else{
			incorrect++;
		}
		quiz.questions[i].global_total++;

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
    loadQuiz();

     $( ".content" ).append("<p>Here are the answers to the questions you missed:</p>");
    for(k=0; k<quiz.questions.length;k++){
    	if(checkedVal[k]!=quiz.questions[k].answers[quiz.questions[k].correct_answer]){
    		$( ".content" ).append("<p><b>" + quiz.questions[k].texts + "</b></p>");
    		$( ".content" ).append("<p>" + quiz.questions[k].answers[quiz.questions[k].correct_answer] + "</p>");
    	}
    }

	$( ".content" ).append("<p>See how you did compared to others:</p>");
	$( ".content" ).append('<table style="width:100%">');
	$( ".content" ).append(' <tr><th>Question</th><th>Your Answer</th><th>Average Correct</th></tr>');
    for(k=0; k<quiz.questions.length;k++){
		  //$( ".content" ).append("<td></td>");
		  //
		   $( ".content" ).append("<tr><td>"+ quiz.questions[k].texts+ "</td>");
		   if(checkedVal[k]===quiz.questions[k].answers[quiz.questions[k].correct_answer]){
          	$( ".content" ).append("<td>Correct</td>");
          }
          else{
          	$( ".content" ).append("<td>Wrong</td>");
          }
    	  $( ".content" ).append("<td>" + Math.floor((quiz.questions[k].global_correct/quiz.questions[k].global_total)*100, -2) + "% correct</td></tr>");

    }
   $( ".content" ).append('</table>');
    var globalQuiz = String(quiz);
    console.log(globalQuiz);



    $.ajax({
        url: '/quiz',
        type: 'POST',
        data: quiz
    });
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
el.addEventListener('click', loadQuiz, false);

var back = document.getElementById("toLastQuestion");
back.addEventListener('click', lastQuestion, false);

var lastOne = document.getElementById("submit");
lastOne.addEventListener('click', nextQuestion, false);



//xhr.open('GET','javascript/quiz', true);
//xhr.send(null);


