
<?php
// ****** ADD *********

// - Property with timestamp if the question has been answered by the team 



/*  Return all the questions as JSON array with objects.
/   Each questions contains questionId, contentHTML  
*/

function getQuestions(){
    include('../connectToDB.php');
 
    //Get all questions whwere isAnswered is false
    $query = "SELECT questionId, contentHTML FROM Challenge2Questions WHERE isAnswered = 0";

    $sql = $pdo->prepare($query);
    $sql->execute();
    $questions = $sql->fetchAll(PDO::FETCH_ASSOC);

    $questions = json_encode($questions);
    echo $questions ;
};


if($_SERVER["REQUEST_METHOD"] == "GET"){
    
    getQuestions();
};

?>
