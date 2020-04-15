<?php
include('connectToDB.php');

$query = "SELECT puzzleId, contentHTML FROM Puzzle1";

$sql = $pdo->prepare($query);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>