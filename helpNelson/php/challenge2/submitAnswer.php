<?php
// Submit, update score

// Check if the question is unanswered in the Challenge2Questions table 

// If answered -> return error message
    
// If question hasn't been answered, -> Check that the team hasn't 
//answered the question in the last 30 seconds Challenge2Submissions

// If it has been answered -> return error

// If it hasn't been answered -> submit answer to Challenge2Submissions and check if the answer was correct in Challenge2Questions

// If it was correct -> set question to answered in Challenge2Questions,
// run getQuestions() -> return sucess rightanswer, and array of all questions


//Update the score of each player in the team.

// if incorrect
// return -> wrong answer
//
?>

<?php


if($_SERVER["REQUEST_METHOD"] == "POST") {
    //Get submission data
    $submissionData = json_decode(file_get_contents('php://input'));
    if(isset($submissionData -> questionId) && isset($submissionData -> answer)){
        submitAnswer($submissionData -> questionId, $submissionData -> answer);
    }
}

function submitAnswer($questionId, $answer, $teamId){
    include('../connectToDB.php');

    $response = new stdClass();
    
    //Check that the question hasn't already been answered
    $query = "SELECT questionId, contentHTML FROM Challenge2Questions WHERE isAnswered = 0 AND questionId = :id";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":id", $questionId, PDO::PARAM_STR);
    $sql->execute();
    $questions = $sql->fetchAll(PDO::FETCH_ASSOC);
    // var_dump($questions);

    //If the question has been answered -> return a error message
    if(count($questions) < 1){
        $response -> error = "Question not available for submission";
        http_response_code(500);
        var_dump($response);
    }

    $query = "SELECT questionId, teamId, submissionTimestamp FROM Challenge2Submissions WHERE teamId = :teamId AND questionId = :questionId";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql->execute();
    $questions = $sql->fetchAll(PDO::FETCH_ASSOC);
    
    var_dump($questions);
    //Check if the team has answered the question incorrect in the last 30 seconds

}

submitAnswer(2, "A", "1");

?>