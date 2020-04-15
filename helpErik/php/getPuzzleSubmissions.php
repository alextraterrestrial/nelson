<?php
include('connectToDB.php');


$query = "SELECT `submission` FROM `Submission1` WHERE teamId = ? AND puzzleId = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamId']);
$sql->bindParam(2, $_GET['puzzleId']);
$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>