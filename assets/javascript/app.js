// Display a graphic with a start button
// Click start button to start game
//  Loop thru object of question
//     A timer starts at 30 seconds and start indicating the amount of time you
//         have left to respond
//     Question displays with list of responses
//     User selects an choice
//     Determine whether correct
//         If correct,
//             increment correct answers
//             stop timer
//             display that you've won for 5 seconds
//             Next Question displays with list of responses
//         Else
//             increment wrong answers
//             stop timer
//             display that they've lost
//                 display correct answer for 5 seconds
//             Next Question displays with list of responses
// end of Loop
// Display
//     Total Correct:
//     Total Wrong:
//     Unanswered:
// Display option to restart again
//     Page should not reload but reset the game

$(document).ready(function() {
	// Trivia questions
	var triviaquestions = [
		{
			question:
				'The Cowboys started their NFL legend in 1960. Their record was 0-11-1, and were led by an eighth season and former Washington Redskin quarterback. Who was it that had a TD/Int ratio of 12-25 in their first season?answers:',
			answers: [ 'Bobby Layne', ' Sammy Baugh', 'Eddie LeBaron', 'Sonny Jurgensen' ],
			correctAnswer: 'Eddie LeBaron'
		},
		{
			question: 'What is the Cowboys logo on their helmets?answersanswers:',
			answers: [ 'Star', 'Oil Well', 'Cowboy on a Bull', 'Cheergirls' ],
			correctAnswer: 'Cowboy on a Bull'
		},
		{
			question: 'What is the primary color of the Cowboys home jersey?answers: ',
			answers: [ 'Blue', 'White', 'Silver', 'Gray' ],
			correctAnswer: 'White'
		},
		{
			question: 'Who replaced Tom Landry as head coach? answers: ',
			answers: [ 'Jimmy Johnson', 'Dave Campo', 'Chan Gailey', 'Bill Parcells' ],
			correctAnswer: 'Jimmy Johnson'
		}
	];

	// object creation for the quiz area
	var card = $('#quiz-area');
	var timer; // timer variable
	// game counters
	var game = {
		correct: 0,
		incorrect: 0,
		counter: 30,

		// Function: Countdown
		// timer counter on page
		countdown: function() {
			game.counter--;
			$('#counter-number').html(game.counter);
			if (game.counter === 0) {
				console.log('times up');
				game.done();
			}
		},

		// Function Start Game
		// Main function to that control page information once the start button
		// is pressed
		startgame: function() {
			timer = setInterval(game.countdown, 1000);
			$('#small-container').prepend("<h2>Time Remaining: <span id='counter-number'>30 </span> seconds</h2>");
			$('#start').remove();
			var i = 0;
			// Loop thru list of questions to display
			for (var i = 0; i < triviaquestions.length; i++) {
				card.append('<h2 class="tquestion">' + triviaquestions[i].question + '</h2>');
				// Inner loop thru list of answers for each of the questions
				for (var j = 0; j < triviaquestions[i].answers.length; j++) {
					card.append(
						"<input type='radio' name='question-" +
							i +
							"' value='" +
							triviaquestions[i].answers[j] +
							"''>" +
							triviaquestions[i].answers[j] +
							'<br/>'
					);
				}
			}
			// display Done button once the list of questions are displayed
			card.append("<button id='done'> Done </button>");
		},
		// Function: Done
		// compares your chosen response to correct answer
		done: function() {
			var inputs = card.children('input:checked');
			for (var i = 0; i < inputs.length; i++) {
				if ($(inputs[i]).val() === triviaquestions[i].correctAnswer) {
					game.correct++;
				} else {
					game.incorrect++;
				}
			}
			this.result();
		},
		// Function: Result
		// displays the result of questions answered
		result: function() {
			clearInterval(timer);
			$('#small-container h2').remove();
			card.html('<h2>All done </h2>');
			card.append('<h3>Correct Answers: ' + this.correct + '</h3>');
			card.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
		}
	};
	// Click event to start game
	$(document).on('click', '#start', function() {
		game.startgame();
	});
	// Click event for Done button
	$(document).on('click', '#done', function() {
		game.done();
	});
});
