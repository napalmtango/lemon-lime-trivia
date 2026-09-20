console.log(
  '%cJS%c script.js running',
  'background-color:gold; font-size: 7px; padding: 5px 0 0 5px',
  ''
);

$(function () {
  $('h1').text('Lemon-lime Trivia');

  // Render initial question on load
  renderQuestions();
});

//-------------------------------------
// STATE VARIABLES
//-------------------------------------
// Tracks current question index (0-indexed to match quiz data array)
let q = 0;

// Resets with each new question to store option (1-4) chosen by user
let chosen = 0;

// Message string displayed to user after selecting an answer, indicates weather answer is correct or incorrect
let feedback = '';

// Counter for total correct answers in current run
let correct = 0;
//-------------------------------------
// END STATE VARIABLES
//-------------------------------------

//-------------------------------------
// QUIZ DATA (2D Array Baseline)
//-------------------------------------
// Each sub-array contains:
// Index 0: [Question Text, Correct Option Index (1-4)]
// Index 1-4: [Option Text, Boolean (isCorrect)]

const questions = [
  // Question 1
  [
    ['1. What does the word ‘flummox’ mean?', 3],
    ['A style of architecture characterized by ornate decorations', false],
    ['A famous British detective from a series of novels', false],
    ['To confuse or perplex greatly', true],
    ['A type of fruit commonly found in tropical regions', false],
  ],

  // Question 2
  [
    ['2. What does the word ‘shenanigans’ mean?', 4],
    ['A word puzzle originating in Ireland', false],
    ['A traditional Hawaiian feast', false],
    ['A state of total chaos', false],
    ['Playful or mischievous activity', true],
  ],

  // Question 3
  [
    ['3. What does the word ‘brouhaha’ mean?', 3],
    ['A sound of hearty laughter', false],
    ['A traditional dance performed at weddings', false],
    ['An uproar or noisy situation', true],
    ['A hilarious situation', false],
  ],

  // Question 4
  [
    ['4. What does the word ‘snollygoster’ mean?', 2],
    ['An expression of surprise', false],
    ['A shrewd, unprincipled person, especially a politician', true],
    ['A colloquial term for an antlion larva', false],
    ['A type of creature that lives in the snow', false],
  ],

  // Question 5
  [
    ['5. What does the word ‘galumph’ mean?', 1],
    ['To move in a clumsy, awkward, or noisy manner', true],
    ['The sound created by a galloping horse', false],
    ['A fictional creature that grants wishes', false],
    ['A type of flower commonly found in Northern Europe', false],
  ],

  // Question 6
  [
    ['6. What does the word ‘codswallop’ mean?', 2],
    ['A type of candy popular in the late 1950s', false],
    ['Nonsense or rubbish', true],
    ['A large club from mideval England', false],
    ['A traditional Scottish dance', false],
  ],

  // Question 7
  [
    ['7. What does the word ‘bumbershoot’ mean?', 1],
    ['An umbrella', true],
    ['A type of dance popular in the 1920s', false],
    ['A style of martial arts originating in Japan', false],
    ['A small creature that live in the sea', false],
  ],

  // Question 8
  [
    ['8. What does the word ‘doozy’ mean?', 4],
    ['A traditional Mediterranean dish made with rice and vegetables', false],
    ['A style art used for surreal paintings', false],
    ['A boring story that puts one to sleep', false],
    ['Something extraordinary or outstanding', true],
  ],

  // Question 9
  [
    ['9. What does the word ‘gadzooks’ mean?', 1],
    ['An exclamation of surprise or annoyance', true],
    ['A percussion instrument commonly used in African music', false],
    ['A character from a famous series of pulp fiction novels', false],
    ['A children’s board game from the 1940s', false],
  ],
];
//-------------------------------------
// END QUIZ DATA
//-------------------------------------

//-------------------------------------
// UI RENDER FUNCTIONS
//-------------------------------------
// Populate DOM elements with question text and answer choices
function renderQuestions() {
  console.log('renderQuestions() invoked');
  $();
  console.log(
    `%cquestion ${q + 1}------------------`,
    'background-color:black; color:yellow; font-size: 9px; padding: .3em'
  );
  $('#questions').text(questions[q][0][0]);

  // Populate options 1 through 4
  for (let i = 1; i <= 4; i++) {
    $(`#ans${i}`).text(questions[q][i][0]);
  }
}

// Update current score counter display
function updateScore() {
  console.log('updateScore() invoked');

  $('#score-tracker').text(`Score ${correct} out of ${q + 1}`);
}

// Display final results screen once all questions are answered

// function renderEndScreen() {
//   $('#qAndA').hide();
//   $('#controls').hide();
//   $('#resultsScreen').html(`
//     <h2>Quiz Completed!</h2>
//     <p>Final Score: <strong>${correct} out of ${questions.length}</strong></p>
//     <button id="restartBtn">Try Again</button>
//   `).show();

//   // Attach event listener for rebooting quiz
//   $('#restartBtn').on('click', resetQuiz);
// }

//-------------------------------------
// END UI RENDER FUNCTIONS
//-------------------------------------

function removeListeners() {
  for (let i = 1; i <= 4; i++) {
    $(`#ans${i}`).unbind();
    $(`#ans${i}`).toggleClass('active');
  }
}

function result() {
  console.log(questions[q][chosen][1]);
  if (questions[q][chosen][1]) {
    console.log('Answer is correct');
    correct++;
    feedback = $('#feedback');
    console.log(feedback);
    $('#feedback').addClass('correct');
    $(`#ans${questions[q][0][1]}`).toggleClass('the-right-one');
    $('.result').html(
      "<span class='rem1-35'>&#127881; </span> Yes, that's the correct answer!"
    );
    $('.next').text('next>>');
  } else {
    console.log('Answer is incorrect');
    feedback = $('#feedback');
    console.log(feedback);
    $('#feedback').addClass('incorrect');
    $(`#ans${questions[q][0][1]}`).toggleClass('the-right-one');
    $('.result').html(
      "<span class='rem1-35'>&#128530; </span> I'm sorry, that answer is incorrect"
    );
    $('.next').text('next>>');
  }
  removeListeners();
  console.log(`${correct} correct out of ${q + 1}`);
  updateScore();
}

function reset() {
  console.log('next clicked');
  $('#feedback').removeClass('correct');
  $('#feedback').removeClass('incorrect');
  $(`#ans` + questions[q][0][1]).removeClass('the-right-one');
  $('.result').text('');
  $('.next').text('');
  setListeners();
  q++;
  // populate();
  renderQuestions();
  if (q == 8) {
    $(`.next`).addClass('hidden');
  }
}
//end Global variables

//Listeners
function setListeners() {
  for (let i = 1; i <= 4; i++) {
    $(`#ans${i}`).toggleClass('active');
    $(`#ans${i}`).click(function () {
      chosen = i;
      console.log('chosen = ' + chosen);
      result();
    });
  }
}

$(`.next`).click(function () {
  reset();
});

//HTML manipulation
// function populate() {
//   $('#questions').text(questions[q][0][0]);

//   // Populate options 1 through 4
//   for (let i = 1; i<=4; i++) {
//     $(`#ans${i}`).text(questions[q][i][0]);
//   }
// }

//Function calls
// populate();
setListeners();
// $(function () {
//   populate();
//   setListeners();
// });
