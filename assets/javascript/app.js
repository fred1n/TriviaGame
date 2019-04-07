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
	var triviaquestions = [
		{
			question: 'Which teams did the Dallas Cowboys beat in Super Bowl VI, XII, XXVII, XXVIII, and XXX?',
			answers: [
				'Dolphins, Broncos, Bills (twice), Steelers',
				'Chiefs, Raiders, Bills (twice), 49ers',
				'Colts, Steelers, Bills (twice), Chargers',
				'Dolphins, Jets, Bills (twice), Patriots'
			],
			correctAnswer: 'Dolphins, Broncos, Bills (twice), Steelers'
		},
		{
			question:
				'His rookie season was in 1989 and his record as a starter was 1-15. This Hall of Famer wore number 8 for Dallas for a total of a dozen seasons?',
			answers: [ 'Tony Romo', 'Roger Staubach', 'Danny White', 'Troy Aikman' ],
			correctAnswer: 'Troy Aikman'
		},
		{
			question: 'Which Dallas quarterback was inducted into the Pro Football Hall of Fame in 2006',
			answers: [ 'Troy Aikman', 'Roger Staubach', 'Tony Romo', 'Don Meredith' ],
			correctAnswer: 'Troy Aikman'
		},
		{
			question: 'What year did the Dallas Cowboys join the NFL?',
			answers: [ '1960', '1970', '1980', '1990' ],
			correctAnswer: '1960'
		},
		{
			question:
				'The first game of the season was against the New York Giants. The Cowboys came out on top of this high scoring game. What was the final score of that game?answers:',
			answers: [ '44-42', '41-36', '38-35', '45-35' ],
			correctAnswer: '45-35'
		},
		{
			question:
				'Tony Romo was the starting quarterback. Who was the backup quarterback in the season?answersanswers: ',
			answers: [ 'Brad Johnson', 'Drew Henson', 'Richard Bartel', ' Matt Baker' ],
			correctAnswer: 'Brad Johnson'
		},
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
			choices: [ 'Blue', 'White', 'Silver', 'Gray' ],
			correctAnswer: 'White'
		},
		{
			question: 'Who replaced Tom Landry as head coach? answers: ',
			answers: [ 'Jimmy Johnson', 'Dave Campo', 'Chan Gailey', 'Bill Parcells' ],
			correctAnswer: 'Jimmy Johnson'
		}
	];

	var card = $('#quiz-area');
	var timer;
	var game = {
		correct: 0,
		incorrect: 0,
		counter: 30,

		countdown: function() {
			game.counter--;
			$('#counter-number').html(game.counter);
			if (game.counter === 0) {
				console.log('times up');
				game.done();
			}
		},

		startgame: function() {
			timer = setInterval(game.countdown, 1000);
			$('#small-container').prepend("<h2>Time Remaining: <span id='counter-number'>30 </span> seconds</h2>");
			$('#start').remove();
			var i = 0;
			// for (var i = 0; i < triviaquestions.length; i++) {
			card.append('<h2 class = "tquestion">' + triviaquestions[i].question + '</h2>');
			for (var j = 0; j < triviaquestions[i].answers.length; j++) {
				card.append(
					"<input type='radio' name='question-'" +
						i +
						'value=' +
						triviaquestions[i].answers[j] +
						'>' +
						triviaquestions[i].answers[j] +
						'<br/>'
				);
			}
			// }

			card.append("<button id='done'> Done </button>");
		},
		done: function() {
			var inputs = card.children('input:checked');
			for (var i = 0; i < inputs.length; i++) {
				if ($(inputs[i].val === triviaquestions[i].correctanswer)) {
					game.correct++;
				} else {
					game.incorrect++;
				}
			}
			this.result();
		},
		result: function() {
			clearInterval(timer);
			$('#small-container h2').remove();
			card.html('<h2>All done </h2>');
			card.append('<h3>Correct Answers: ' + this.correct + '</h3>');
			card.append('<h3>Incorrect Answers: ' + this.incorrect + '</h3>');
		}
	};
	// Click events
	$(document).on('click', '#start', function() {
		game.startgame();
	});
	$(document).on('click', '#done', function() {
		game.done();
	});
});
