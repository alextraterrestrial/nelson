
<?php
// ****** ADD *********

// - Property with timestamp if the question has been answered by the team 



/*  Return all the questions as JSON array with objects.
/   Each questions contains questionId, contentHTML  
*/

function getQuestions($teamId){
    include('../connectToDB.php');
    header('Content-Type: application/json');

    //Check if teamId is present
    if($teamId){

        // Get previous submission for each question
        // $query = "SELECT submissionTimestamp FROM Challenge2Submissions WHERE teamId = :teamId";
        // $sql = $pdo->prepare($query);
        // $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
        // $sql->execute();
        // $previousSubmissions = $sql->fetchAll(PDO::FETCH_ASSOC);


        // $previousSubmissions[0]["submissionTimestamp"];
    }
 
    //Get all questions whwere isAnswered is false
    $query = "SELECT Challenge2Questions.questionId, contentHTML, submissionTimestamp FROM Challenge2Questions LEFT JOIN Challenge2Submissions ON Challenge2Questions.questionId = Challenge2Submissions.questionId AND teamId = :teamId WHERE isAnswered = 0
    ";

    $sql = $pdo->prepare($query);
    $sql -> bindParam(":teamId", $teamId, PDO::PARAM_STR);
    $sql->execute();
    $questions = $sql->fetchAll(PDO::FETCH_ASSOC);

    $questions = json_encode($questions);
    echo $questions ;
};

// SELECT Challenge2Questions.questionId, contentHTML, submissionTimestamp,teamId FROM Challenge2Questions JOIN Challenge2Submissions ON Challenge2Questions.questionId = Challenge2Submissions.questionId WHERE teamId = 1 AND isAnswered = 0 

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $submissionData = json_decode(file_get_contents('php://input'));

    // $teamId = $submissionData -> teamId;
    $teamId = $_POST['teamId'];
    
    getQuestions($teamId);
};

?>
