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


//return
//timestamp if an answer is incorrect or question have been answered the last 30 sec
//response: "already answered" - if the question have been answered
//response: "correct"  - if the submitted answer is correct

//if(timestamp) {
    //cooldown(time)
//} else (response == "correct") {

//} etc.

?>

<?php


if($_SERVER["REQUEST_METHOD"] == "POST") {
    //Get submission data
    $submissionData = json_decode(file_get_contents('php://input'));

    $questionId = $submissionData -> questionId;
    $answer = trim($submissionData -> answer);
    $teamId = $submissionData -> teamId;

    // $questionId = $_POST['questionId'];
    // $answer = $_POST['answer'];
    // $teamId = $_POST['teamId'];
    
    
    if(isset($questionId, $answer, $teamId)){
        submitAnswer($questionId, $answer, $teamId);
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
    header('Content-Type: application/json');

    $response = new stdClass();
    
    //Check that the question hasn't already been answered
    $query = "SELECT questionId, contentHTML, answer, checkType, minChars FROM Challenge2Questions WHERE isAnswered = 0 AND questionId = :id";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":id", $questionId, PDO::PARAM_STR);
    $sql->execute();
    $question = $sql->fetchAll(PDO::FETCH_ASSOC);

    //If the question has been answered -> return a error message
    if(!$question){
        $response -> response = "Question has already been answered";
        echo json_encode($response);
        return;
    }
  
    //Save answer
    $correctAnswer = $question[0]["answer"];
    //Save checktype
    $checkType = $question[0]["checkType"];
    // Save minChars
    $minChars = $question[0]["minChars"];

    //Check if the team has answered the question incorrect.
    $query = "SELECT questionId, teamId, submissionTimestamp, answer FROM Challenge2Submissions WHERE teamId = :teamId AND questionId = :questionId";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql->execute();
    $questionAnswered = $sql->fetchAll(PDO::FETCH_ASSOC);

    //check time when last answered
   // If it has been answered -> return when it was submitted and message
    if($questionAnswered){

        // Check duration since last submission
        $submissionTimestamp = strtotime($questionAnswered[0]["submissionTimestamp"]);
        $timeSinceLastSubmission = (time() + 7200) - $submissionTimestamp;
        

        if($timeSinceLastSubmission < 30){
            $response -> response = "previousSubmission";
            $response -> submittedOn = $questionAnswered[0]["submissionTimestamp"];
            $response -> submission = $questionAnswered[0]["answer"];

            echo json_encode($response);
            return;
        }
        
        // Remove previous submission 

        $query = "DELETE FROM Challenge2Submissions WHERE teamId = :teamId AND questionId = :questionId";
        $sql = $pdo->prepare($query);
        $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
        $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
        $sql->execute();
        
    }

    // If it has NOT been answered incorrectly
    //Submit answer to cChallenge2Submissions
    $query = "INSERT INTO Challenge2Submissions (questionId, teamId, answer) VALUES (:questionId, :teamId, :answer)";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql -> bindParam(":answer", $answer, PDO::PARAM_STR);

    $sql->execute();

    // Get submissionTimeStamp
    $query = "SELECT submissionTimestamp, answer FROM Challenge2Submissions WHERE questionId = :questionId AND teamId = :teamId";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql->execute();
    $submissions = $sql->fetchAll();

    $submissionTimestamp = $submissions[0]["submissionTimestamp"];
    $answer = $submissions[0]["answer"];
    
    // Check if the answer contains enough characters and was correct
    if($answer < $minchars){
        $response -> response = "incorrect";
        //return timestamp on asnwer as well
        echo json_encode($response);
        return;
    }
  
    // Check for an exact checkType
    if(validateAnswer($answer, $correctAnswer, $checkType)){
        //Get all the teammembers
        $query = "SELECT userId FROM UserTeam WHERE teamId = :teamId AND UserTeam.status != 'pending'";
        $sql = $pdo->prepare($query);
        $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);

        $sql->execute();
        $teamMembers = $sql->fetchAll();

        $points = 1;
        //Update score for each member in the team
        foreach($teamMembers as $teamMember){
            $query = "UPDATE User SET score = score + $points WHERE userId = :userId";
            $sql = $pdo->prepare($query);
            $sql -> bindParam(":userId", $teamMember[0], PDO::PARAM_STR);
            $sql->execute();

            // echo "Updating score for id: " . $teamMember[0] . " ";
        }
        

        $response -> response = "correct";
        echo json_encode($response);
    } else{
        $response -> response = "incorrect";
        $response -> lastSubmitted = $submissionTimestamp;
        $response -> submission = $answer;
  
        //return timestamp on asnwer as well
        echo json_encode($response);
    }

    // If answer was correct -> Set question to be answered
    if($response -> response == "correct"){
        $query = "UPDATE Challenge2Questions SET isAnswered = 1 WHERE questionId = :questionId";
        $sql = $pdo->prepare($query);
        $sql -> bindParam(":questionId", $questionId, PDO::PARAM_STR);
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