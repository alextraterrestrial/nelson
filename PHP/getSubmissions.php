<?php
include('connectDB.php');

$pdo = connectDB();

$query = "SELECT COUNT(*) AS submissions FROM Submission1 WHERE puzzleId = ?";

$sql = $pdo->prepare($query);

$sql->bindParam(1, $_GET['puzzleId']);

$sql->execute();
$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);
echo $answer;
?>