<?php
// Submit, update score

// Check if the question is unanswered in the Challenge2Questions table 

// If answered -> return error message
    
// If question hasn't been answered, -> Check that the team hasn't 
//answered the question in the last 30 seconds Challenge2Submissions

// If it has been answered -> return error (return seconds)

// If it hasn't been answered -> submit answer to Challenge2Submissions and check if the answer was correct in Challenge2Questions

// If it was correct -> set question to answered in Challenge2Questions,
// run getQuestions() -> return sucess rightanswer, and array of all questions


//Update the score of each player in the team.

// if incorrect
// return -> wrong answer
//


// ***** ADD *****




?>

<?php


if($_SERVER["REQUEST_METHOD"] == "POST") {
    //Get submission data
    $submissionData = json_decode(file_get_contents('php://input'));

    $questionId = $submissionData -> questionId;
    $answer = $submissionData -> answer;
    $teamId = $submissionData -> teamId;
    
    if(isset($questionId, $answer, $teamId)){
        submitAnswer($questionId, $answer, $teamId);
        //  if(validateAnswer("answer", "correctanswer", "SUINAN")){
        //      echo "Correct";
        //  } else{
        //      echo "False";
        //  }
    } else{
        echo json_encode("Missing something");
        http_response_code(500);
    }
}
/*
//  Takes a submission and submits is to the database
//  @param $questionID. The id of the question to be submitted
//  @param $answer. The answer to be submitted
//  @param $teamId. The ID of the team 
//  Returns JSON object with the result of the submission
*/
function submitAnswer($questionId, $answer, $teamId){
    include('../connectToDB.php');

    $response = new stdClass();
    
    //Check that the question hasn't already been answered
    $query = "SELECT questionId, contentHTML, answer, checkType, minChars FROM Challenge2Questions WHERE isAnswered = 0 AND questionId = :id";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":id", $questionId, PDO::PARAM_STR);
    $sql->execute();
    $question = $sql->fetchAll(PDO::FETCH_ASSOC);

    //If the question has been answered -> return a error message
    if(!$question){
        $response -> error = "Question has already been answered";
        http_response_code(500);
        echo json_encode($response);
        return;
    }
  
    //Save answer
    $correctAnswer = $question[0]["answer"];
    //Save checktype
    $checkType = $question[0]["checkType"];
    // Save minChars
    $minChars = $question[0]["minChars"];

    //Check if the team has answered the question incorrect in the last 30 seconds
    $query = "SELECT questionId, teamId, submissionTimestamp FROM Challenge2Submissions WHERE teamId = :teamId AND questionId = :questionId";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql->execute();
    $questionAnswered = $sql->fetchAll(PDO::FETCH_ASSOC);

   // If it has been answered -> return when it was submitted and message
    if($questionAnswered){
        $response -> error = "A previous submission by your team was found";
        $response -> submittedOn = $questionAnswered[0]["submissionTimestamp"];

        echo json_encode($response);
        return;
    }

    // If it has NOT been answered incorrectly
    //Submit answer to cChallenge2Submissions
    $query = "INSERT INTO Challenge2Submissions (questionId, teamId, answer) VALUES (:questionId, :teamId, :answer)";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql -> bindParam(":answer", $answer, PDO::PARAM_STR);

    $sql->execute();

    // Check if the answer contains enough characters and was correct
    if($answer < $minchars){
        $response -> correct = false;
        echo json_encode($response);
        return;
    }
  
    // Check for an exact checkType
    if(validateAnswer($answer, $correctAnswer, $checkType)){
        $response -> correct = true;
        echo json_encode($response);
    } else{
        $response -> correct = false;
        echo json_encode($response);
    }



    // Check for Answer in submission

    //Check for Submission in aswer

    // If answer was correct -> Set question to be answered
    if($response -> correct == true){
        $query = "INSERT INTO Challenge2Questions (isAnswered) VALUES (1)";
        $sql = $pdo->prepare($query);
        $sql->execute();
        return;
    }

}
/*
/ Validate submission against the correct answer using its checktype
@ param $answer The submission
@ param $correctAnswer The correct answer taken from db
@ param $checkType The type of validation to be performed

@ return Boolean. True if correct, else false
*/
function validateAnswer($answer, $correctAnswer, $checkType){
    switch($checkType){
        case "SAMEAS": 
            return $answer == $correctAnswer;
        case "ANINSU":
            return strpos($correctAnswer, $answer) !== false;
        case "SUINAN":
            return strpos($answer, $correctAnswer) !== false;
    }
}

?>