<?php
//get a list of all questions from challenge 2 to check if they have been answered or not.
?>

<?php
    include('../connectToDB.php');

    $query = "SELECT questionId, isAnswered FROM Challenge2Questions WHERE isAnswered = 1";

    $sql = $pdo->prepare($query);
    $sql->execute();
    $questions = $sql->fetchAll(PDO::FETCH_ASSOC);

    $questions = json_encode($questions);
    echo $questions ;
?>