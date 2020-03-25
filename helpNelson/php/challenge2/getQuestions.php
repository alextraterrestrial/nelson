
<?php
function getQuestions(){
    include('../connectToDB.php');
 
    //Get all questions whwere isAnswered is false
    
    $query = "SELECT questionId, contentHTML FROM Challenge2Questions WHERE isAnswered = 0";

    $sql = $pdo->prepare($query);
    $sql->execute();
    $answer = $sql->fetchAll(PDO::FETCH_ASSOC);

    $answer = json_encode($answer);
    print_r($answer) ;
};

getQuestions();


if($_SERVER["REQUEST_METHOD"] == "GET"){
    getQuestions();
};

?>
