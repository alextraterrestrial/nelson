<?php
include('connectDB.php');

$pdo = connectDB();


// add checkType och minChars för att kolla om svaret följer reglerna?
// och i så fall lägga till en ok-kolumn i databasen?
$query = "SELECT puzzleId, contentHTML, image FROM Puzzle1";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>