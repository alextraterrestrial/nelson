// Submit, update score

// Check if the question is unanswered in the Challenge2Questions table 

// If answered -> return error message
    
// If question hasn't been answered, -> Check that the team hasn't 
answered the question in the last 30 seconds Challenge2Submissions

// If it has been answered -> return error

// If it hasn't been answered -> submit answer to Challenge2Submissions and check if the answer was correct in Challenge2Questions

// If it was correct -> set question to answered in Challenge2Questions,
// run getQuestions() -> return sucess rightanswer, and array of all questions


Update the score of each player in the team.

// if incorrect
// return -> wrong answer
//


<?php
include("./getQuestions.php");

if($_SERVER["REQUEST_METHOD"] == "POST") {
    //Get submission data
    $submissionData = json_decode(file_get_contents('php://input'));
    if(isset($submissionData -> questionId) && isset($submissionData -> answer)){
        submitAnswer($submissionData -> questionId, $submissionData -> answer);
    }
}

function submitAnswer($questionId, $answer, $teamId){

}

?>